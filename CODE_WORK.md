# Code Work Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Organization](#code-organization)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)
10. [Resources](#resources)

## Prerequisites

Before you begin working with this project, ensure you have the following installed:

- **Node.js** (v14 or higher)

  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node -v` and `npm -v`

- **Git**

  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

- **Code Editor**
  - Recommended: Visual Studio Code
  - Extensions:
    - ESLint
    - Prettier
    - React Developer Tools
    - Live Server

## Installation

Follow these steps to set up the project:

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open the application**
   - The application will be available at `http://localhost:1234`
   - Parcel will automatically open your default browser

## Project Structure

```
├── components/         # React components
│   ├── Header.jsx     # Main navigation header
│   ├── SearchBar.jsx  # Country search component
│   ├── CountryCard.jsx # Country card component
│   └── ThemeToggle.jsx # Theme toggle button
├── contexts/          # React context providers
│   └── ThemeContext.jsx # Theme management context
├── hooks/             # Custom React hooks
│   ├── useTheme.js    # Theme context hook
│   └── useCountries.js # Countries data hook
├── pages/             # Page components
│   ├── HomePage.jsx   # Home page component
│   └── CountryDetail.jsx # Country detail page
├── App.jsx            # Main application component
├── App.css            # Main styles
├── index.html         # HTML entry point
├── index.jsx          # JavaScript entry point
└── countriesData.js   # Countries data
```

## Development Workflow

### 1. Starting Development

```bash
# Start the development server
npm start
```

- The development server will run on port 1234
- Changes will automatically reload the page
- Console errors will be displayed in the browser

### 2. Making Changes

1. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Edit the relevant files
   - Follow the code style guidelines
   - Test your changes in the browser

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push your changes**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Add a description of your changes

### 3. Building for Production

```bash
# Build the project
npm run build
```

- The build will be created in the `dist` folder
- The build is optimized for production
- The build can be deployed to any static hosting service

## Code Organization

### Component Structure

- **Functional Components**: Use functional components with hooks
- **Props**: Use destructuring for props
- **State**: Use useState and useEffect hooks
- **Context**: Use useContext hook

### File Naming

- **Components**: PascalCase (e.g., `CountryCard.jsx`)
- **Hooks**: camelCase (e.g., `useTheme.js`)
- **Context**: PascalCase (e.g., `ThemeContext.jsx`)
- **CSS**: PascalCase (e.g., `App.css`)

### Import Order

1. React imports
2. Third-party library imports
3. Component imports
4. Hook imports
5. Context imports
6. CSS imports

## Testing

### Manual Testing

1. **Theme Switching**

   - Click the theme toggle button
   - Verify the theme changes
   - Refresh the page and verify the theme persists

2. **Search Functionality**

   - Type in the search bar
   - Verify the results update
   - Clear the search and verify all countries are shown

3. **Filter Functionality**

   - Select a region from the dropdown
   - Verify only countries in that region are shown
   - Clear the filter and verify all countries are shown

4. **Responsive Design**

   - Resize the browser window
   - Verify the layout adjusts correctly
   - Test on mobile devices

5. **Navigation**
   - Click on a country card
   - Verify the country detail page loads
   - Click the back button
   - Verify the home page loads

### Automated Testing (Future Implementation)

```bash
# Run tests
npm test
```

## Deployment

### 1. Build the Project

```bash
# Clean the build folder
npm run clean

# Build the project
npm run build
```

### 2. Deploy to Hosting Service

#### GitHub Pages

1. Add `"homepage": "https://[username].github.io/[repository-name]"` to `package.json`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Deploy: `npm run deploy`

#### Netlify

1. Create a Netlify account
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

#### Vercel

1. Create a Vercel account
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

## Troubleshooting

### Common Issues

1. **Module not found**

   - Check if the module is installed
   - Check if the import path is correct
   - Run `npm install` to reinstall dependencies

2. **Build errors**

   - Check for syntax errors
   - Check for missing dependencies
   - Run `npm run clean` and try again

3. **Theme not working**

   - Check if the theme context is properly set up
   - Check if the theme toggle is working
   - Check if localStorage is available

4. **API errors**
   - Check if the API is accessible
   - Check if the API response is valid
   - Check if the error handling is working

### Debugging

1. **Browser Console**

   - Open the browser console (F12)
   - Check for errors
   - Use console.log to debug

2. **React Developer Tools**

   - Install the React Developer Tools extension
   - Use the Components tab to inspect components
   - Use the Profiler tab to profile performance

3. **Network Tab**
   - Open the browser developer tools
   - Go to the Network tab
   - Check for failed requests
   - Check for slow requests

## Best Practices

### Code Style

- Use functional components
- Use hooks for state and effects
- Use destructuring for props
- Use meaningful variable names
- Use comments for complex logic
- Use consistent formatting

### Performance

- Use React.memo for expensive components
- Use useCallback for functions passed as props
- Use useMemo for expensive calculations
- Use lazy loading for routes
- Use image optimization
- Use code splitting

### Accessibility

- Use semantic HTML
- Use ARIA attributes
- Use keyboard navigation
- Use color contrast
- Use focus management
- Use screen readers

### Security

- Sanitize user input
- Use HTTPS
- Use Content Security Policy
- Use XSS protection
- Use CSRF protection
- Use secure storage

## Resources

### Documentation

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)
- [Parcel Documentation](https://parceljs.org/docs/)
- [REST Countries API Documentation](https://restcountries.com/)

### Tools

- [VS Code](https://code.visualstudio.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Parcel](https://parceljs.org/)
- [Git](https://git-scm.com/)

### Learning Resources

- [React Official Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [React Context Documentation](https://reactjs.org/docs/context.html)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
