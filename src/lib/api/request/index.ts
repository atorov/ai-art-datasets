type TRequestInit = Partial<{
        method: string
        headers: { [K: string]: string }
        data: any
        body: string
        mode: 'no-cors' | 'cors' | 'same-origin'
}>

type TRequestCustom = Partial<{
    cb: Function
    dispatch: Function
}>

async function request(resource: string, init: TRequestInit = {}, custom: TRequestCustom = {}) {
    const {
        method = 'GET',
        headers = {},
        data,
        body,
        mode = 'cors', // no-cors, cors, *same-origin
        // credentials: 'same-origin', // include, *same-origin, omit
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
    } = init || {}

    const {
        cb = () => {},
        dispatch = () => {},
        // state = {},
    } = custom || {}

    let payload
    if (!['OPTIONS', 'GET', 'HEAD'].includes(method.toUpperCase())) {
        if (body) payload = body
        else if (data) payload = JSON.stringify(data)
    }

    console.log('::: request:', { resource, method, payload: body || data })

    const combinedHeaders = {
        'Content-Type': headers['Content-Type'] || 'application/json',
        ...headers,
    }

    let response
    try {
        response = await fetch(resource, {
            method,
            headers: combinedHeaders,
            body: payload,
            mode,
        })
    }
    catch (reason) {
        const msg = '::: Request error!'
        console.error(msg, reason)
        throw reason
    }

    if ([401, 403].includes(response.status)) {
        dispatch({ type: ':authState/INIT:' })
    }

    if (!response.ok) {
        console.error('::: Request error! status:', response.status)
        console.error('::: Request error! statusText:', response.statusText)
        console.error('::: Request error! response:', await response.text())
        const error: any = new Error(response.statusText)
        error.response = await response
        throw error
    }

    let responseData
    try {
        responseData = await response.json()
    }
    catch (reason) {
        const msg = '::: Request parsing error!'
        console.error(msg, reason)
        throw reason
    }

    cb(response, responseData)

    return {
        response,
        data: responseData,
    }
}

export default request
