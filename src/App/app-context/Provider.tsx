import {
    Dispatch,
    createContext,
    useContext,
    useMemo,
    useReducer,
} from 'react'
import PropTypes, { InferProps } from 'prop-types'

import initState from './init-state'
import type { TInitState } from './init-state'
import reducer from './reducer'

const defaultContextValue: [TInitState, Dispatch<{ type: string; payload?: any; }>] = [initState, () => { }]
const Context = createContext(defaultContextValue)
Context.displayName = 'AppContext'

function Provider(props: InferProps<typeof Provider.propTypes>) {
    const [state, dispatch] = useReducer(reducer, initState)
    const value: typeof defaultContextValue = useMemo(() => [state, dispatch], [state])

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
    const context = useContext(Context)

    // if (context === undefined) {
    //     throw new Error('Must be used within a Provider')
    // }

    return context
}

export { useAppContext }

export default Provider
