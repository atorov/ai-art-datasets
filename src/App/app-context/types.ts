import * as React from 'react'
import type { TDataset } from '../../types/TDataset'
import type { TGalleryItem } from '../../types/TGalleryItem'
import type { THomeNavItems } from '../../types/THomeNavItems'

type TAppStateUi = {
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

export type TAppState = {
    status: string
    ui: TAppStateUi
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

export type TAppAction = {
    type: string
    payload?: any
}

export type TAppDispatch = React.Dispatch<TAppAction>
