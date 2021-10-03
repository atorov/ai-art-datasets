import { Redirect } from 'react-router-dom'

import { useAuthContext } from '../../../../auth-context/Provider'

function Profile() {
    const [authState] = useAuthContext()

    return <Redirect to={`/users/${authState.user.id}`} />
}

export default Profile
