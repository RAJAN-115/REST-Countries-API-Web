import React, { useEffect, useState } from 'react';
import './CountryDetail.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import CountryDetailShimmer from './CountryDetailShimmer';

export default function CountryDetail() {
  const [isDark] = useTheme();
  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  async function updateCountryData(data) {
    // Set initial country data
    const newCountryData = {
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      flag: data.flags.svg,
      tld: data.tld,
      languages: Object.values(data.languages || {}).join(', '),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
      borders: [],
    };
    setCountryData(newCountryData);

    // Handle border countries
    if (!data.borders || data.borders.length === 0) {
      return;
    }

    try {
      const borderCountries = await Promise.all(
        data.borders.map(async (border) => {
          try {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            if (!res.ok) {
              throw new Error(`Failed to fetch ${border}: ${res.status}`);
            }
            const [borderCountry] = await res.json();
            return borderCountry.name.common;
          } catch (error) {
            console.error(error.message);
            return null; // Skip failed border countries
          }
        })
      );
      // Filter out null values and update state
      const validBorders = borderCountries.filter(Boolean);
      setCountryData((prevState) => ({
        ...prevState,
        borders: validBorders,
      }));
    } catch (error) {
      console.error('Error fetching border countries:', error);
    }
  }

  useEffect(() => {
    async function fetchCountryData() {
      if (state) {
        await updateCountryData(state);
        return;
      }

      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!res.ok) {
          throw new Error(`Country not found: ${res.status}`);
        }
        const [data] = await res.json();
        await updateCountryData(data);
      } catch (err) {
        console.error('Error fetching country data:', err);
        setNotFound(true);
      }
    }

    fetchCountryData();
  }, [countryName, state]);

  if (notFound) {
    return <div>Country Not Found</div>;
  }

  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </span>
        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  {countryData.nativeName || countryData.name}
                </p>
                <p>
                  <b>Population: </b>
                  {countryData.population.toLocaleString('en-IN')}
                </p>
                <p>
                  <b>Region: </b>
                  {countryData.region}
                </p>
                <p>
                  <b>Sub Region: </b>
                  {countryData.subregion}
                </p>
                <p>
                  <b>Capital: </b>
                  {countryData.capital?.join(', ') || 'N/A'}
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  {countryData.tld?.join(', ') || 'N/A'}
                </p>
                <p>
                  <b>Currencies: </b>
                  {countryData.currencies}
                </p>
                <p>
                  <b>Languages: </b>
                  {countryData.languages}
                </p>
              </div>
              {countryData.borders.length > 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}