import type { TAppState } from './types'

const initState: TAppState = {
    status: ':START_INIT:',

    ui: {
        footer: {
            height: 24,
        },
        topBar: {
            height: 64,
        },
        xtheme: {
            palette: {},
        },
    },

    datasets: {
        status: '',
        data: [],
        sfs: {
            minItemsNumber: 0,
            minItemsResolution: 0,
            order: ':NEWEST_FIRST:',
            searchTerm: '',
            selectedAuthors: [],
            selectedImageFormats: [],
            selectedLicenses: [],
        },
    },
    gallery: {
        status: '',
        data: [],
        sfs: {
            order: ':NEWEST_FIRST:',
            searchTerm: '',
            selectedAuthors: [],
        },
    },
    homeNavItems: {
        status: '',
        data: [],
    },
    xsettings: {
        status: '',
        data: {},
    },
}

export default initState
