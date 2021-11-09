import type { TAuthState } from '../../../App/auth-context/types'

function checkAuth(authData: TAuthState) {
    return !!authData.accessToken
}

export default checkAuth
