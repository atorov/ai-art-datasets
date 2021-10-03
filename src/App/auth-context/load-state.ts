import type { TInitState } from './init-state'

function loadState(itemKey: string) {
    let saved: TInitState = {}
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
