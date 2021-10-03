import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Container from '@mui/material/Container'
import ReactJson from 'react-json-view'
import request from '../../../../../lib/api/request'
import useAuth from '../../../../../lib/hooks/use-auth'
import { useAuthContext } from '../../../../auth-context/Provider'
import getFlag from '../../../../../lib/misc/get-flag'

declare const APP_NAME: string

function reduceArrayToObject(array: (string | number)[], obj: any = {}): any {
    const [_key, ...rest] = array
    const key = decodeURIComponent(_key as string).replace(/\(dot\)/g, '.')
    return array.length === 2
        ? { [decodeURIComponent(key)]: rest[0] }
        : { ...obj, [key]: reduceArrayToObject(rest, obj[key]) }
}

function isObject(item: any) {
    return (Boolean(item) && typeof item === 'object' && !Array.isArray(item))
}

function mergeDeep(target: any, source: any) {
    const output = { ...target }
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] })
                }
                else {
                    output[key] = mergeDeep(target[key], source[key])
                }
            }
            else {
                Object.assign(output, { [key]: source[key] })
            }
        });
    }
    return output
}

function convertTrackerDataToObject(data: any) {
    const arrays: (string | number)[][] = Object.entries(data)
        .map(([key, value]) => [...key.split(';;'), value] as (string | number)[])
    const objectArray = arrays.map((array) => (reduceArrayToObject(array)))
    return objectArray.reduce((acc, item) => mergeDeep(acc, item), {})
}

function AdminConsole() {
    const [authState] = useAuthContext()
    const isAdmin = authState.user.role === ':ADMIN:'

    const history = useHistory()

    const [, auth]: any = useAuth()

    const [trackerData, setTrackerData] = useState({} as any)
    const [loadingClientIpInfo, setLoadingClientIpInfo] = useState(false)

    useEffect(() => {
        if (isAdmin) {
            (async () => {
                try {
                    const data: any = (await request(`https://tracker-api-v1.herokuapp.com/api/items/${APP_NAME}`)).data.data
                    let parsedData = convertTrackerDataToObject(data)

                    if (parsedData?.__clientIp) {
                        const __clientIpNum = Object.keys(parsedData.__clientIp).length
                        parsedData = { ...parsedData, __clientIpNum }
                    }

                    setTrackerData(parsedData)
                }
                catch (reason) {
                    const msg = '::: Could not read tracker data!'
                    console.error(msg, reason)
                }
            })()
        }
        else {
            auth(false)
            history.push('/')
        }
    }, [auth, history, isAdmin])

    return (
        <Container sx={{ mt: 8 }}>
            <ReactJson
                src={trackerData}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard
                onEdit={false}
                theme="ashes"
                style={{ backgroundColor: '#303030' }}
            />

            <br />
            <button
                type="button"
                disabled={!trackerData?.__clientIp || loadingClientIpInfo}
                onClick={async () => {
                    const clientIps: string[] = Object.keys(trackerData.__clientIp)
                    try {
                        setLoadingClientIpInfo(true)

                        const clientIpsInfo: any[] = []

                        for (let i = 0; i < clientIps.length; i++) {
                            const ip = clientIps[i]
                            const res = await request(`https://ipapi.co/${ip}/json/`)
                            const data = res?.data
                            if (data && !data.error) {
                                clientIpsInfo.push(data)
                            }
                        }

                        const __decoratedClientIps = Object.entries(trackerData.__clientIp)
                            .reduce((acc, [ip, __visits]) => {
                                const clientIpInfo = clientIpsInfo.find((item: any) => item.ip === ip)
                                if (clientIpInfo) {
                                    return [...acc, { ...clientIpInfo, __visits, __flag: getFlag(clientIpInfo.country) }]
                                }
                                return acc
                            }, [] as any[])
                            .sort(({ __visits: a }, { __visits: b }) => {
                                if (a < b) return 1
                                if (a > b) return -1
                                return 0
                            })
                        setTrackerData((prevTrackerData: any) => ({ ...prevTrackerData, __decoratedClientIps }))
                    }
                    catch (reason) {
                        const msg = '::: Could not read client IPs data!'
                        console.error(msg, reason)
                    }

                    setLoadingClientIpInfo(false)
                }}
            >
                Get client IPs info
            </button>

            <br />
            <br />
            <button
                type="button"
                disabled={!trackerData?.__clientIp || loadingClientIpInfo}
                onClick={async () => {
                    setLoadingClientIpInfo(true)

                    const clientIps: string[] = Object.keys(trackerData.__clientIp)
                    try {
                        const ip = clientIps[clientIps.length - 1]
                        const res = await request(`https://ipapi.co/${ip}/json/`)
                        const data = res?.data

                        const __visits = trackerData.__clientIp[ip]

                        if (data && !data.error && __visits) {
                            const __decoratedLastClientIp = { ...data, __visits, __flag: getFlag(data.country) }
                            setTrackerData((prevTrackerData: any) => ({ ...prevTrackerData, __decoratedLastClientIp }))
                        }
                    }
                    catch (reason) {
                        const msg = '::: Could not read client IP data!'
                        console.error(msg, reason)
                    }

                    setLoadingClientIpInfo(false)
                }}
            >
                Get last client IPs info
            </button>
        </Container>
    )
}

export default AdminConsole
