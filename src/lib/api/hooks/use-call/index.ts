import * as React from 'react'
import { useAuthContext } from '../../../../App/auth-context/Provider'
import request from '../../request'
import type { TRequestCustom, TRequestInit } from '../../request'

function useCall<TData>() {
    const [{ accessToken }, authDispatch] = useAuthContext()

    const call = React.useCallback((
        endpoint: string,
        init: TRequestInit = {},
        custom: TRequestCustom = {},
    ) => request<TData>(
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

    return call
}

export default useCall
