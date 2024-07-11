import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {  RouterProvider} from "react-router-dom";
import router from './route/index';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f4f4f4",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  );
}

export default App;
