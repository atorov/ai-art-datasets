/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
function collectNavigatorData(serialize = false) {
    const data: any = {}
    for (const key in navigator) {
        const property = (navigator as any)[key]
        if (
            key !== 'plugins'
            && key !== 'mimeTypes'
            && typeof property !== 'function'
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

export default collectNavigatorData
