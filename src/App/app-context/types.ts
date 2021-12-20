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

type TAppActionVoid = {
    type: ':appState/__void__:'
}
type TAppActionStatusSet = {
    type: ':appState/status/SET:'
    payload: TAppStateStatus
}
type TAppActionDatasetsPatch = {
    type: ':appState/datasets/PATCH:'
    payload: Partial<TAppStateDatasetsObj>
}
type TAppActionGalleryPatch = {
    type: ':appState/gallery/PATCH:'
    payload: Partial<TAppStateGalleryItemsObj>
}
type TAppActionHomeNavItemsPatch = {
    type: ':appState/homeNavItems/PATCH:'
    payload: Partial<TAppStateHomeNavItemsObj>
}
type TAppActionXsettingsPatch = {
    type: ':appState/xsettings/PATCH:'
    payload: Partial<TAppStateXsettingsObj>
}
export type TAppAction =
    TAppActionVoid
    | TAppActionStatusSet
    | TAppActionDatasetsPatch
    | TAppActionGalleryPatch
    | TAppActionHomeNavItemsPatch
    | TAppActionXsettingsPatch

export type TAppDispatch = React.Dispatch<TAppAction>
