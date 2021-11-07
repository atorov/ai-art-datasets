import {
    useEffect,
    useState,
} from 'react'

import { useLocation } from 'react-router-dom'

import { useAuthContext } from '../../../App/auth-context/Provider'

import request from '../../api/request'

import collectData from './collect-data'
import reformatData from './reformat-data'

declare const APP_NAME: string

function useTracker() {
    const [authState] = useAuthContext()
    const location = useLocation()
    const [data, setData] = useState(() => collectData(authState.user))

    useEffect(() => {
        setData(collectData(authState.user))
    }, [authState.user, location.pathname])

    useEffect(() => {
        setData(collectData(authState.user))
    }, [authState.user])

    useEffect(() => {
        const reformatedData = reformatData(data)
        request(
            'https://tracker-api-v1.herokuapp.com/api/items',
            {
                method: 'POST',
                data: { site: APP_NAME, data: reformatedData },
            },
        )
    }, [data])
}

export default useTracker
