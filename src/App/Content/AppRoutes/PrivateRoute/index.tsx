import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../../../lib/hooks/use-auth'

type TProps = {
    children: JSX.Element
}

const PrivateRoute: React.FC<TProps> = ({ children }: TProps) => {
    const [isAuth] = useAuth()
    const location = useLocation()

    if (isAuth) {
        return children
    }

    return (
        <Navigate
            to="/login"
            state={{ from: location }}
        />
    )
}

export default PrivateRoute
