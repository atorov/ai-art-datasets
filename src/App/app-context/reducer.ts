// import initState from './init-state'
import type { TInitState } from './init-state'

function reducer(
    state: TInitState,
    action: { type: string, payload?: any },
): TInitState {
    switch (action.type) {
        // Init
        // case ':appState/INIT:':
        // return initState

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
