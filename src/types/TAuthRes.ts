export type TAuthUserRole = ':ADMIN:' | ':USER:' | null

export type TAuthRes = {
    accessToken: string
    name: string
    role: TAuthUserRole
    userId: string

}
