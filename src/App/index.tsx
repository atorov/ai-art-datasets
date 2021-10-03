import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import AppContextProvider from './app-context/Provider'
import AuthContextProvider from './auth-context/Provider'

import Content from './Content'

import './style.scss'

const appLoaderElement = document.querySelector('.app-loader')
if (appLoaderElement) {
    appLoaderElement.parentNode?.removeChild(appLoaderElement)
}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContextProvider>
                <AuthContextProvider>
                    <Content />
                </AuthContextProvider>
            </AppContextProvider>
        </ThemeProvider>
    )
}

export default App
