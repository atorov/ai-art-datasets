import { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import useAuth from '../../../../lib/hooks/use-auth'

function Logout() {
    const [, auth]: any = useAuth()

    useEffect(() => {
        auth(false)
    }, [auth])

    return <Navigate to="/" />
}

export default Logout
