import { createContext, useState, useEffect, useMemo } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { getDesignTokens } from '../theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const storedMode = localStorage.getItem('themeMode');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize with stored preference, system preference, or light mode
  const [mode, setMode] = useState(storedMode || (prefersDarkMode ? 'dark' : 'light'));

  // Create theme based on current mode
  const theme = useMemo(() => {
    const tokens = getDesignTokens(mode);
    let newTheme = createTheme(tokens);
    newTheme = responsiveFontSizes(newTheme);
    return newTheme;
  }, [mode]);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Update theme if system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('themeMode')) {
        setMode(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
