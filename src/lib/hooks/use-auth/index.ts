import { useCallback } from 'react'

import { useAuthContext } from '../../../App/auth-context/Provider'

import checkAuth from './check-auth'

function useAuth() {
    const [authState, authDispatch] = useAuthContext()

    const auth = useCallback((goAuth, data) => {
        if (goAuth === true && data) {
            authDispatch({
                type: ':authState/PATCH:',
                payload: data,
            })
        }
        else {
            authDispatch({ type: ':authState/INIT:' })
        }
    }, [authDispatch])

    return [checkAuth(authState), auth]
}

export default useAuth
