import {
    useEffect,
    useRef,
    useState,
} from 'react'

import { useHistory } from 'react-router-dom'

import { useAuthContext } from '../../../App/auth-context/Provider'

import request from '../../api/request'

import collectData from './collect-data'
import reformatData from './reformat-data'

declare const APP_NAME: string

function useTracker() {
    const unlistenRef = useRef(() => {})

    const [authState] = useAuthContext()

    const history = useHistory()

    const [data, setData] = useState(() => collectData(authState.user))

    useEffect(() => {
        unlistenRef.current = history.listen(() => {
            setData(collectData(authState.user))
        })

        return () => unlistenRef.current()
    }, [authState.user, history])

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
