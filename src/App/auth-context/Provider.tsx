import * as React from 'react'
import PropTypes, { InferProps } from 'prop-types'

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

function Provider(props: InferProps<typeof Provider.propTypes>) {
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

Provider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
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
