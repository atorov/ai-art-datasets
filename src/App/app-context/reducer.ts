// import initState from './init-state'
import type { TAppState, TAppEvent } from './types'

function reducer(state: TAppState, event: TAppEvent): TAppState {
    switch (event.type) {
        // __void__
        case ':appState/__void__:':
            return state

        // status
        case ':appState/status/SET:':
            return {
                ...state,
                status: event.payload,
            }

        case ':appState/datasets/PATCH:':
            return {
                ...state,
                datasets: {
                    ...state.datasets,
                    ...event.payload,
                },
            }
        case ':appState/gallery/PATCH:':
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    ...event.payload,
                },
            }
        case ':appState/homeNavItems/PATCH:':
            return {
                ...state,
                homeNavItems: {
                    ...state.homeNavItems,
                    ...event.payload,
                },
            }
        case ':appState/xsettings/PATCH:':
            return {
                ...state,
                xsettings: {
                    ...state.xsettings,
                    ...event.payload,
                },
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
