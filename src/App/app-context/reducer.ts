// import initState from './init-state'
import type { TAppState, TAppAction } from './types'

function reducer(state: TAppState, action: TAppAction): TAppState {
    switch (action.type) {
        // __void__
        case ':appState/__void__:':
            return state

        // status
        case ':appState/status/SET:':
            return {
                ...state,
                status: action.payload,
            }

        case ':appState/datasets/PATCH:':
            return {
                ...state,
                datasets: {
                    ...state.datasets,
                    ...action.payload,
                },
            }
        case ':appState/gallery/PATCH:':
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    ...action.payload,
                },
            }
        case ':appState/homeNavItems/PATCH:':
            return {
                ...state,
                homeNavItems: {
                    ...state.homeNavItems,
                    ...action.payload,
                },
            }
        case ':appState/xsettings/PATCH:':
            return {
                ...state,
                xsettings: {
                    ...state.xsettings,
                    ...action.payload,
                },
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
