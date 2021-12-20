import * as React from 'react'
import type { TUser } from '../../types/TUser'

export type TAuthState = Partial<{
    accessToken: string;
    user: TUser;
}>

export type TAuthAction = {
    type: string
    payload?: any
}

export type TAuthDispatch = React.Dispatch<TAuthAction>
