import * as React from 'react'
import type { TDatasetItem } from '../../types/TDatasetItem'
import type { TGalleryItem } from '../../types/TGalleryItem'
import type { THomeNavItems } from '../../types/THomeNavItems'
import type { TXsettings } from '../../types/TXsettings'

type TAppStateDatasetsObj = {
    status: string
    data: TDatasetItem[]
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

type TAppStateGalleryItemsObj = {
    status: string
    data: TGalleryItem[]
    sfs: {
        order: string
        searchTerm: string
        selectedAuthors: string[]
    }
}

type TAppStateHomeNavItemsObj = {
    status: ''
    data: THomeNavItems[]
}

type TAppStateUi = {
    footer: {
        height: number
    }
    topBar: {
        height: number
    }
    xtheme: {
        palette: unknown
    }
}

type TAppStateXsettingsObj = {
    status: ''
    data: TXsettings
}

export type TAppState = {
    status: ':START_INIT:' | ':READY:'
    ui: TAppStateUi
    datasets: TAppStateDatasetsObj
    gallery: TAppStateGalleryItemsObj
    homeNavItems: TAppStateHomeNavItemsObj
    xsettings: TAppStateXsettingsObj
}

export type TAppAction = {
    type: string
    payload?: any
}

export type TAppDispatch = React.Dispatch<TAppAction>
