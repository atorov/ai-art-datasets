import * as React from 'react'
import type { TUser } from '../../types/TUser'

export type TAuthState = Partial<{
    accessToken: string;
    user: TUser;
}>

type TAuthEventVoid = {
    type: ':appState/__void__:'
}
type TAuthEventInit = {
    type: ':authState/INIT:'
}
type TAuthEventPatch = {
    type: ':authState/PATCH:'
    payload: Partial<TAuthState>
}
export type TAuthEvent =
    TAuthEventVoid
    | TAuthEventInit
    | TAuthEventPatch

export type TAuthDispatch = React.Dispatch<TAuthEvent>
