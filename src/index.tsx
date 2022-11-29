import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

declare const APP_NAME: string
declare const APP_VERSION: string
declare const MODE: string
declare const NODE_ENV: string
declare const BUILD_ENV: string

const appRootElement: HTMLElement | null = document.querySelector('#app-root')
const buildDate = appRootElement?.dataset.buildDate

console.log('::: ::: :::')
console.log('::: APP_NAME:', APP_NAME)
console.log('::: APP_VERSION:', APP_VERSION)
console.log('::: MODE:', MODE)
console.log('::: NODE_ENV:', NODE_ENV)
console.log('::: process.env.NODE_ENV (NODE_ENV):', process.env.NODE_ENV)
console.log('::: BUILD_ENV:', BUILD_ENV)
console.log('::: Build Date:', buildDate)
console.log('::: ::: :::')

const container = document.querySelector('#app-root') as Element
const root = createRoot(container)
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)
