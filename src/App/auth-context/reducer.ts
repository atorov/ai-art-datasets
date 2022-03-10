import initState from './init-state'
import type { TAuthState, TAuthEvent } from './types'

function reducer(state: TAuthState, event: TAuthEvent): TAuthState {
    switch (event.type) {
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
                ...event.payload,
            }

        // do not match
        default: {
            const msg = 'Event type does not match!'
            console.error(msg, (event as any).type)
            throw new Error(msg)
            // return state
        }
    }
}

export default reducer
