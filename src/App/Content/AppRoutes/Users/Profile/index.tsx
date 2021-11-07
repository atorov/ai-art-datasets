import { Navigate } from 'react-router-dom'

import { useAuthContext } from '../../../../auth-context/Provider'

function Profile() {
    const [authState] = useAuthContext()

    return <Navigate to={`/users/${authState.user.id}`} />
}

export default Profile
