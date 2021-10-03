import { useCallback } from 'react'

import { useAuthContext } from '../../../../App/auth-context/Provider'

import request from '../../request'

function useCall() {
    const [{ accessToken }, authDispatch] = useAuthContext()

    const myCall = useCallback((endpoint: string, init = {}, custom = {}) => request(
        'https://uman-api-v1.herokuapp.com/api' + endpoint,
        {
            ...init,
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            },
        },
        {
            dispatch: authDispatch,
            // state: authState,
            ...custom,
        },
    ), [accessToken, authDispatch])

    return myCall
}

export default useCall
