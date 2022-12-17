import * as React from 'react'
import initState from './init-state'
import reducer from './reducer'
import type { TAppState, TAppDispatch } from './types'

const defaultContextValue: [TAppState, TAppDispatch] = [initState, () => ({ type: ':appState/__void__:' })]
const Context = React.createContext(defaultContextValue)
Context.displayName = 'AppContext'

type TProps = {
    children: JSX.Element
}

const Provider: React.FC<TProps> = (props: TProps) => {
    const { children, ...childrenProps } = props

    const [state, dispatch] = React.useReducer(reducer, initState)
    const value: typeof defaultContextValue = React.useMemo(() => [state, dispatch], [state])

    return (
        <Context.Provider value={value} {...childrenProps}>
            {children}
        </Context.Provider>
    )
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
