import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: 'rgba(6,6,6,0.87)',
    },
    secondary: {
      main: '#f35d64',
      light: '#d9666b',
    },
    background: {
      default: '#342a79',
      paper: '#78C6D5',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: 'rgba(249,247,247,0.38)',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: 500,
    fontWeightRegular: 600,
    fontWeightBold: 900,
    fontWeightMedium: 700,
    h1: {
      fontWeight: 600,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
