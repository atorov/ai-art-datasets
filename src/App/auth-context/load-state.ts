import type { TAuthState } from './types'

function loadState(itemKey: string) {
    let saved: TAuthState = {}
    try {
        const serialized = sessionStorage.getItem(itemKey)
        if (serialized) {
            saved = JSON.parse(serialized)
        }
    }
    catch (reason) {
        const msg = '::: Load state error!'
        console.error(msg, reason)
    }

    return saved
}

export default loadState
