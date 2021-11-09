import * as React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import initState from './init-state'
import reducer from './reducer'
import type { TAppState, TAppDispatch } from './types'

const defaultContextValue: [TAppState, TAppDispatch] = [initState, () => { }]
const Context = React.createContext(defaultContextValue)
Context.displayName = 'AppContext'

function Provider(props: InferProps<typeof Provider.propTypes>) {
    const [state, dispatch] = React.useReducer(reducer, initState)
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

function useAppContext() {
    const context = React.useContext(Context)

    if (context === undefined) {
        throw new Error('Must be used within a Provider')
    }

    return context
}

export { useAppContext }

export default Provider
