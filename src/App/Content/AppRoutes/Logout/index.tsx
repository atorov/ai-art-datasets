import * as React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../../../lib/hooks/use-auth'

const Logout = () => {
    const [, auth] = useAuth()

    React.useEffect(() => {
        auth(false)
    }, [auth])

    return <Navigate to="/" />
}

export default Logout
