import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

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
        type: 'dark',
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
