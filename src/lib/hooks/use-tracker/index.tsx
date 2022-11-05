import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../../App/auth-context/Provider'
import request from '../../api/request'
import collectData from './collect-data'
import reformatData from './reformat-data'

declare const APP_NAME: string

function useTracker() {
    const [authState] = useAuthContext()
    const location = useLocation()
    const [data, setData] = React.useState(() => collectData(authState.user))

    React.useEffect(() => {
        setData(collectData(authState.user))
    }, [authState.user, location.pathname])

    React.useEffect(() => {
        setData(collectData(authState.user))
    }, [authState.user])

    React.useEffect(() => {
        const reformatedData = reformatData(data)
        request(
            'https://tracker-api-production.up.railway.app/api/items',
            {
                method: 'POST',
                data: { site: APP_NAME, data: reformatedData },
            },
        )
    }, [data])
}

export default useTracker
