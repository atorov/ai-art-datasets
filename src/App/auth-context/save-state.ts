import type { TAuthState } from './types'

function saveState(data: TAuthState, itemKey: string) {
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
