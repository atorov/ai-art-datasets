import * as React from 'react'
import { useAuthContext } from '../../../App/auth-context/Provider'
import checkAuth from './check-auth'

function useAuth(): [boolean, (goAuth: any, data?: any) => void] {
    const [authState, authDispatch] = useAuthContext()

    const auth = React.useCallback((goAuth, data) => {
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
