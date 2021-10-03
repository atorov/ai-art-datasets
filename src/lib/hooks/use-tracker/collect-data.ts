import collectLocationData from './collect-location-data'
import collectNavigatorData from './collect-navigator-data'

function collectData(user: any) {
    return {
        location: collectLocationData(),
        navigator: collectNavigatorData(),
        user: user ?? null,
    }
}

export default collectData
