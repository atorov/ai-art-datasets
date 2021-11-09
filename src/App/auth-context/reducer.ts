import initState from './init-state'
import type { TAuthState, TAuthAction } from './types'

function reducer(state: TAuthState, action: TAuthAction): TAuthState {
    switch (action.type) {
        // Init
        case ':authState/INIT:':
            return initState

        // General
        case ':authState/PATCH:':
            return {
                ...state,
                ...action.payload,
            }

        // Do not match
        default: {
            const msg = 'Action type does not match!'
            console.warn(msg, action.type)
            throw new Error(msg)
            // return state
        }
    }
}

export default reducer
