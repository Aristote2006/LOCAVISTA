import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import ThemeProvider, { ThemeContext } from './context/ThemeContext'
import { ActivityProvider } from './context/ActivityContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {({ theme }) => (
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <ActivityProvider>
                  <App />
                </ActivityProvider>
                <ToastContainer
                  position="bottom-right"
                  theme={theme.palette.mode}
                  toastStyle={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
              </MuiThemeProvider>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
