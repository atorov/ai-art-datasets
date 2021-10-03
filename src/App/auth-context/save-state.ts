import type { TInitState } from './init-state'

function saveState(data: TInitState, itemKey: string) {
    try {
        const serialized = JSON.stringify(data)
        sessionStorage.setItem(itemKey, serialized)
    }
    catch (reason) {
        const msg = '::: Save state error!'
        console.error(msg, reason)
    }
}

export default saveState
