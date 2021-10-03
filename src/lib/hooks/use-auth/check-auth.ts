import type { TInitState } from '../../../App/auth-context/init-state'

function checkAuth(authData: TInitState) {
    return !!authData.accessToken
}

export default checkAuth
