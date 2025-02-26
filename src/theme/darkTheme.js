import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D1117',
      paper: '#21262D',
    },
    primary: {
      main: '#58A6FF',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#8B949E',
    },
    divider: '#30363D',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Poppins', sans-serif",
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
    },
    h4: {
      fontFamily: "'Poppins', sans-serif",
    },
    h5: {
      fontFamily: "'Poppins', sans-serif",
    },
    h6: {
      fontFamily: "'Poppins', sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#21262D',
          borderColor: '#30363D',
          borderWidth: 1,
          borderStyle: 'solid',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#21262D',
          borderColor: '#30363D',
          borderWidth: 1,
          borderStyle: 'solid',
        },
      },
    },
  },
}); 