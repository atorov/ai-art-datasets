import * as React from 'react'

export type TAuthState = Partial<{
    accessToken: string;
    user: any;
}>

export type TAuthAction = {
    type: string
    payload?: any
}

export type TAuthDispatch = React.Dispatch<TAuthAction>
