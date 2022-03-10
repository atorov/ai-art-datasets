import * as React from 'react'
import type { TDatasetItem } from '../../types/TDatasetItem'
import type { TGalleryItem } from '../../types/TGalleryItem'
import type { THomeNavItems } from '../../types/THomeNavItems'
import type { TXsettings } from '../../types/TXsettings'

type TAppStateStatus = ':START_INIT:' | ':INIT:' | ':READY:' | ':ERROR:'
type TAppStateDatasetsObj = {
    status: '' | ':READY:' | ':ERROR:'
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
    status: '' | ':READY:' | ':ERROR:'
    data: TGalleryItem[]
    sfs: {
        order: string
        searchTerm: string
        selectedAuthors: string[]
    }
}
type TAppStateHomeNavItemsObj = {
    status: '' | ':READY:' | ':ERROR:'
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
    status: '' | ':READY:' | ':ERROR:'
    data: TXsettings
}

export type TAppState = {
    status: TAppStateStatus
    ui: TAppStateUi
    datasets: TAppStateDatasetsObj
    gallery: TAppStateGalleryItemsObj
    homeNavItems: TAppStateHomeNavItemsObj
    xsettings: TAppStateXsettingsObj
}

type TAppEventVoid = {
    type: ':appState/__void__:'
}
type TAppEventStatusSet = {
    type: ':appState/status/SET:'
    payload: TAppStateStatus
}
type TAppEventDatasetsPatch = {
    type: ':appState/datasets/PATCH:'
    payload: Partial<TAppStateDatasetsObj>
}
type TAppEventGalleryPatch = {
    type: ':appState/gallery/PATCH:'
    payload: Partial<TAppStateGalleryItemsObj>
}
type TAppEventHomeNavItemsPatch = {
    type: ':appState/homeNavItems/PATCH:'
    payload: Partial<TAppStateHomeNavItemsObj>
}
type TAppEventXsettingsPatch = {
    type: ':appState/xsettings/PATCH:'
    payload: Partial<TAppStateXsettingsObj>
}
export type TAppEvent =
    TAppEventVoid
    | TAppEventStatusSet
    | TAppEventDatasetsPatch
    | TAppEventGalleryPatch
    | TAppEventHomeNavItemsPatch
    | TAppEventXsettingsPatch

export type TAppDispatch = React.Dispatch<TAppEvent>
