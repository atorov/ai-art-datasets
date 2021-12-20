import initState from './init-state'
import type { TAuthState, TAuthAction } from './types'

function reducer(state: TAuthState, action: TAuthAction): TAuthState {
    switch (action.type) {
        // __void__
        case ':appState/__void__:':
            return state

        // init
        case ':authState/INIT:':
            return initState

        // general
        case ':authState/PATCH:':
            return {
                ...state,
                ...action.payload,
            }

        // do not match
        default: {
            const msg = 'Action type does not match!'
            console.error(msg, (action as any).type)
            throw new Error(msg)
            // return state
        }
    }
}

export default reducer
