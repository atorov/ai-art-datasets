function encodeString(str: any) {
    return encodeURIComponent(String(str)).replace(/\./g, '(dot)')
}

function reformatData(data: any) {
    return {
        [`location;;origin;;${encodeString(data.location?.origin)}`]: 1,
        [`location;;pathname;;${encodeString(data.location?.pathname)}`]: 1,
        [`navigator;;appVersion;;${encodeString(data.navigator?.appVersion)}`]: 1,
        [`navigator;;deviceMemory;;${encodeString(data.navigator?.deviceMemory)}`]: 1,
        [`navigator;;doNotTrack;;${encodeString(data.navigator?.doNotTrack)}`]: 1,
        [`navigator;;language;;${encodeString(data.navigator?.language)}`]: 1,
        [`navigator;;languages;;${encodeString((data.navigator?.languages || []).join())}`]: 1,
        [`navigator;;maxTouchPoints;;${encodeString(data.navigator?.maxTouchPoints)}`]: 1,
        [`navigator;;onLine;;${encodeString(data.navigator?.onLine)}`]: 1,
        [`navigator;;platform;;${encodeString(data.navigator?.platform)}`]: 1,
        [`navigator;;product;;${encodeString(data.navigator?.product)}`]: 1,
        [`navigator;;vendor;;${encodeString(data.navigator?.vendor)}`]: 1,
        [`user;;id;;${encodeString(data.user?.id)}`]: 1,
        [`user;;name;;${encodeString(data.user?.name)}`]: 1,
        [`user;;role;;${encodeString(data.user?.role)}`]: 1,
    }
}

export default reformatData
