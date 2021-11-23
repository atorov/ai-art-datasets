import * as React from 'react'
import getInitState from './get-init-state'
import reducer from './reducer'
import saveState from './save-state'
import type { TAuthState, TAuthDispatch } from './types'

declare const APP_NAME: string

const STORAGE_KEY = `${APP_NAME}-auth`
const initState = getInitState(STORAGE_KEY)

const defaultContextValue: [TAuthState, TAuthDispatch] = [initState, () => { }]
const Context = React.createContext(defaultContextValue)
Context.displayName = 'AuthContext'

type TProps = {
    children: JSX.Element
}

const Provider: React.FC<TProps> = (props: TProps) => {
    const [state, dispatch] = React.useReducer(reducer, initState)

    React.useEffect(() => {
        saveState(state, STORAGE_KEY)
    }, [state])

    const value: typeof defaultContextValue = React.useMemo(() => [state, dispatch], [state])

    return (
        <Context.Provider value={value} {...props}>
            {props.children}
        </Context.Provider>
    )
}

function useAuthContext() {
    const context = React.useContext(Context)

    if (context === undefined) {
        throw new Error('Must be used within a Provider')
    }

    return context
}

export { useAuthContext }

export default Provider
