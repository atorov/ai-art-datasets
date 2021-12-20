import type { TAuthUserRole } from './TAuthRes'

export type TUser = Partial<{
    id: string
    name: string
    role: TAuthUserRole
}>
