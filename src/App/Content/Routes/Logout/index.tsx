import { useEffect } from 'react'

import { Redirect } from 'react-router-dom'

import useAuth from '../../../../lib/hooks/use-auth'

function Logout() {
    const [, auth]: any = useAuth()

    useEffect(() => {
        auth(false)
    }, [auth])

    return <Redirect to="/" />
}

export default Logout
