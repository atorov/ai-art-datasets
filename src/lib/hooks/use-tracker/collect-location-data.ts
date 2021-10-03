/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
function collectLocationData(serialize = false) {
    const data: any = {}
    for (const key in window.location) {
        const property = (window.location as any)[key]
        if (
            typeof property !== 'function'
            && !(Array.isArray(property) && !property.length)
            && !(typeof property === 'object' && !Array.isArray(property) && property !== null && !Object.keys(property).length)
        ) {
            data[key] = property
        }
    }

    if (!serialize) {
        return data
    }

    let serialized = ''
    try {
        serialized = JSON.stringify(data)
    }
    catch (reason) {
        console.error(reason)
    }

    return serialized
}

export default collectLocationData
