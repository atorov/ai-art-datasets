import initState from './init-state'
import type { TInitState } from './init-state'

function reducer(
    state: TInitState,
    action: { type: string, payload?: any },
): TInitState {
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
