// File: src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5680E9', 
    },
    secondary: {
      main: '#8860D0', 
    },
    background: {
      default: '#f4f7f9', 
      paper: '#ffffff',   
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
    h3: {
      fontWeight: 'bold',
    },
    h6: {
      color: '#6c757d'
    },
    button: {
        textTransform: 'none', 
        fontWeight: 'bold',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px', 
        }
      }
    }
  }
});

export default theme;