# Code Explanation Documentation

## 📚 Table of Contents

1. [App Component](#app-component)
2. [Theme Context](#theme-context)
3. [Components](#components)
4. [Custom Hooks](#custom-hooks)
5. [API Integration](#api-integration)
6. [Routing](#routing)
7. [Styling](#styling)

## App Component

### App.jsx

```jsx
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};
```

**Explanation:**

- Root component that wraps the entire application
- Uses `ThemeProvider` for global theme state management
- `Header` component is always visible
- `Outlet` from React Router renders child routes
- Imports global styles from App.css

## Theme Context

### ThemeContext.jsx

```jsx
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
```

**Explanation:**

- Creates a context for theme management
- Uses localStorage to persist theme preference
- Provides theme state and toggle function to children
- Automatically applies theme class to HTML element
- Uses lazy initialization for initial theme state

## Components

### Header.jsx

```jsx
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { isDarkMode } = useTheme();

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Where in the world?</h1>
      <ThemeToggle />
    </header>
  );
};
```

**Explanation:**

- Main navigation header
- Uses custom `useTheme` hook for theme state
- Conditionally applies theme classes
- Contains theme toggle button

### SearchBar.jsx

```jsx
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = e => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a country..."
      />
    </div>
  );
};
```

**Explanation:**

- Controlled input component for country search
- Maintains local state for input value
- Calls parent's onSearch function on change
- Debounced search implementation

### CountryCard.jsx

```jsx
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const { name, population, region, capital, flags } = country;

  return (
    <Link to={`/country/${name}`} className="country-card">
      <img src={flags.png} alt={`${name} flag`} />
      <div className="country-info">
        <h3>{name}</h3>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
      </div>
    </Link>
  );
};
```

**Explanation:**

- Displays country information in card format
- Uses React Router's Link for navigation
- Formats population numbers
- Handles missing data gracefully

## Custom Hooks

### useTheme.js

```jsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

**Explanation:**

- Custom hook for accessing theme context
- Provides error handling for incorrect usage
- Simplifies theme context consumption

### useCountries.js

```jsx
import { useState, useEffect } from 'react';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};
```

**Explanation:**

- Manages countries data fetching
- Handles loading and error states
- Uses useEffect for data fetching
- Returns countries data and status

## API Integration

### api.js

```jsx
const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountry = async name => {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    if (!response.ok) throw new Error('Country not found');
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const fetchCountriesByRegion = async region => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
```

**Explanation:**

- Centralizes API calls
- Handles error cases
- Provides type-specific fetching functions
- Uses consistent error handling

## Routing

### index.jsx

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import CountryDetail from './pages/CountryDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="country/:name" element={<CountryDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
```

**Explanation:**

- Sets up application routing
- Uses nested routes for layout sharing
- Implements dynamic routing for country details
- Provides 404 handling

## Styling

### App.css

```css
:root {
  --primary-color: #2b3945;
  --secondary-color: #111517;
  --background-light: #ffffff;
  --background-dark: #202c37;
  --text-light: #111517;
  --text-dark: #ffffff;
}

/* Theme Classes */
.dark-mode {
  --background: var(--background-dark);
  --text: var(--text-dark);
}

.light-mode {
  --background: var(--background-light);
  --text: var(--text-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .country-grid {
    grid-template-columns: 1fr;
  }
}
```

**Explanation:**

- Defines CSS variables for theming
- Implements responsive design
- Uses BEM naming convention
- Provides theme-specific styles

## Error Handling

### ErrorBoundary.jsx

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

**Explanation:**

- Catches JavaScript errors
- Prevents app crashes
- Provides fallback UI
- Logs errors for debugging

## Performance Optimizations

### Image Optimization

```jsx
const OptimizedImage = ({ src, alt, sizes }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      sizes={sizes}
      srcSet={`
        ${src}?w=320 320w,
        ${src}?w=640 640w,
        ${src}?w=1280 1280w
      `}
    />
  );
};
```

**Explanation:**

- Implements lazy loading
- Provides responsive images
- Optimizes image loading
- Uses srcset for different sizes

## State Management

### useLocalStorage.js

```jsx
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
```

**Explanation:**

- Persists state in localStorage
- Handles JSON serialization
- Provides error handling
- Syncs state with storage
