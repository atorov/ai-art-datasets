import type { TDataset } from '../../types/TDataset'
import type { TGalleryItem } from '../../types/TGalleryItem'
import type { THomeNavItems } from '../../types/THomeNavItems'

type TInitStateUi = {
    footer: {
        height: number
    }
    topBar: {
        height: number
        }
    xtheme: {
        palette: any // TODO:
    }
}

export type TInitState = {
    status: string
    ui: TInitStateUi
    datasets: {
        status: string
        data: TDataset[]
        sfs: {
            minItemsNumber: number
            minItemsResolution: number
            order: string
            searchTerm: string
            selectedAuthors: string[]
            selectedImageFormats: string[]
            selectedLicenses: string[]
        }
    }
    gallery: {
        status: string
        data: TGalleryItem[]
        sfs: {
            order: string
            searchTerm: string
            selectedAuthors: string[]
        }
    }
    homeNavItems: {
        status: string
        data: THomeNavItems[]
    }
    xsettings: {
        status: string
        data: any // TODO:
    }
}

const initState: TInitState = {
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
