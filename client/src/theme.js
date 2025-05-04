import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Custom color palette
const primaryColor = '#2E7D32'; // Forest green
const secondaryColor = '#FF6D00'; // Vibrant orange
const darkColor = '#1B5E20'; // Dark green
const lightColor = '#E8F5E9'; // Light green
const accentColor = '#FFC107'; // Amber accent

// Define design tokens based on mode (light/dark)
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: primaryColor,
      light: mode === 'dark' ? '#5CBA5F' : '#4CAF50',
      dark: darkColor,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondaryColor,
      light: '#FF9E40',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#FAFAFA',
      paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
      light: mode === 'dark' ? '#2C2C2C' : lightColor,
      accent: accentColor,
      sidebar: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
      card: mode === 'dark' ? '#252525' : '#FFFFFF',
      gradient: mode === 'dark'
        ? 'linear-gradient(135deg, rgba(46, 125, 50, 0.15), rgba(21, 101, 192, 0.15))'
        : 'linear-gradient(135deg, rgba(46, 125, 50, 0.1), rgba(30, 136, 229, 0.1))',
    },
    text: {
      primary: mode === 'dark' ? '#E0E0E0' : '#263238',
      secondary: mode === 'dark' ? '#AAAAAA' : '#546E7A',
      disabled: mode === 'dark' ? '#666666' : '#90A4AE',
      hint: mode === 'dark' ? '#777777' : '#78909C',
    },
    success: {
      main: '#43A047',
      light: '#66BB6A',
      dark: '#2E7D32',
    },
    error: {
      main: '#E53935',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#FFA000',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#1E88E5',
      light: '#42A5F5',
      dark: '#1565C0',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.05)',
    '0px 6px 12px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.08)',
    '0px 10px 20px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.1)',
    '0px 14px 28px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.12)',
    '0px 18px 36px rgba(0, 0, 0, 0.14)',
    '0px 20px 40px rgba(0, 0, 0, 0.14)',
    '0px 22px 44px rgba(0, 0, 0, 0.16)',
    '0px 24px 48px rgba(0, 0, 0, 0.16)',
    '0px 26px 52px rgba(0, 0, 0, 0.18)',
    '0px 28px 56px rgba(0, 0, 0, 0.18)',
    '0px 30px 60px rgba(0, 0, 0, 0.2)',
    '0px 32px 64px rgba(0, 0, 0, 0.2)',
    '0px 34px 68px rgba(0, 0, 0, 0.22)',
    '0px 36px 72px rgba(0, 0, 0, 0.22)',
    '0px 38px 76px rgba(0, 0, 0, 0.24)',
    '0px 40px 80px rgba(0, 0, 0, 0.24)',
    '0px 42px 84px rgba(0, 0, 0, 0.26)',
    '0px 44px 88px rgba(0, 0, 0, 0.26)',
    '0px 46px 92px rgba(0, 0, 0, 0.28)',
    '0px 48px 96px rgba(0, 0, 0, 0.28)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 24px',
          boxShadow: mode === 'dark'
            ? '0px 4px 12px rgba(0, 0, 0, 0.3)'
            : '0px 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'dark'
              ? '0px 8px 16px rgba(0, 0, 0, 0.4)'
              : '0px 8px 16px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: mode === 'dark'
              ? '0px 8px 16px rgba(0, 0, 0, 0.5)'
              : '0px 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'dark'
            ? '0px 6px 16px rgba(0, 0, 0, 0.3)'
            : '0px 6px 16px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          backgroundColor: mode === 'dark' ? '#252525' : '#FFFFFF',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: mode === 'dark'
              ? '0px 12px 24px rgba(0, 0, 0, 0.4)'
              : '0px 12px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: mode === 'dark' ? '#252525' : '#FFFFFF',
        },
        elevation1: {
          boxShadow: mode === 'dark'
            ? '0px 4px 12px rgba(0, 0, 0, 0.2)'
            : '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: mode === 'dark'
            ? '0px 6px 16px rgba(0, 0, 0, 0.25)'
            : '0px 6px 16px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: mode === 'dark'
            ? '0px 8px 20px rgba(0, 0, 0, 0.3)'
            : '0px 8px 20px rgba(0, 0, 0, 0.1)',
        },
        elevation4: {
          boxShadow: mode === 'dark'
            ? '0px 10px 24px rgba(0, 0, 0, 0.35)'
            : '0px 10px 24px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'dark'
            ? '0px 2px 10px rgba(0, 0, 0, 0.3)'
            : '0px 2px 10px rgba(0, 0, 0, 0.08)',
          backgroundColor: mode === 'dark' ? '#1A1A1A' : primaryColor,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
          backgroundImage: mode === 'dark'
            ? 'linear-gradient(rgba(26, 26, 26, 0.95), rgba(26, 26, 26, 0.95)), url("https://www.transparenttextures.com/patterns/cubes.png")'
            : 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url("https://www.transparenttextures.com/patterns/cubes.png")',
          borderRight: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColor,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'dark'
            ? '0px 2px 8px rgba(0, 0, 0, 0.3)'
            : '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 8,
          backgroundColor: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          minWidth: 100,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            backgroundColor: mode === 'dark'
              ? alpha(primaryColor, 0.2)
              : alpha(primaryColor, 0.1),
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? alpha(primaryColor, 0.3)
                : alpha(primaryColor, 0.2),
            },
          },
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: mode === 'dark'
            ? '#555 #1e1e1e'
            : '#ccc #f5f5f5',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
          },
          '&::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? '#555' : '#ccc',
            borderRadius: '4px',
            '&:hover': {
              background: mode === 'dark' ? '#777' : '#999',
            },
          },
        },
      },
    },
  },
});

// Create a default light theme for export
const lightTheme = createTheme(getDesignTokens('light'));

export default lightTheme;
