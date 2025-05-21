import React, { createContext, useState, useContext, useEffect } from 'react';

// Create theme context
export const ThemeContext = createContext(null);

// Custom hook for consuming the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme provider component with persistence
export function ThemeProvider({ children, initialTheme }) {
  // Try to get theme from localStorage or use the passed initialTheme or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pelicanai_theme');
    return savedTheme || initialTheme || 'light';
  });
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pelicanai_theme', theme);
    // Apply theme to body for global styling
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme,
    setTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}