import * as React from 'react'
import type { TUser } from '../../types/TUser'

export type TAuthState = Partial<{
    accessToken: string;
    user: TUser;
}>

type TAuthActionVoid = {
    type: ':appState/__void__:'
}
type TAuthActionInit = {
    type: ':authState/INIT:'
}
type TAuthActionPatch = {
    type: ':authState/PATCH:'
    payload: Partial<TAuthState>
}
export type TAuthAction =
    TAuthActionVoid
    | TAuthActionInit
    | TAuthActionPatch

export type TAuthDispatch = React.Dispatch<TAuthAction>
