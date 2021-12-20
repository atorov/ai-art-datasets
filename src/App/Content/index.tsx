import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import request from '../../lib/api/request'
import type { TDatasetItem } from '../../types/TDatasetItem'
import type { TGalleryItem } from '../../types/TGalleryItem'
import type { THomeNavItems } from '../../types/THomeNavItems'
import type { TXsettings } from '../../types/TXsettings'
import { useAppContext } from '../app-context/Provider'
import { useAuthContext } from '../auth-context/Provider'
import AppRoutes from './AppRoutes'
import Footer from './Footer'
import TopBar from './TopBar'

declare const APP_NAME: string

const Content = () => {
    const [appState, appDispatch] = useAppContext()
    console.log('::: appState:', appState)

    const [authState] = useAuthContext()
    console.log('::: authState:', authState)

    // Init
    React.useEffect(() => {
        if (appState.status === ':START_INIT:') {
            appDispatch({
                type: ':appState/status/SET:',
                payload: ':INIT:',
            });

            (async () => {
                try {
                    const res = (await Promise.all([
                        request<TXsettings>('/local-db/xsettings.json'),
                        request<THomeNavItems[]>('/local-db/home-nav-items.json'),
                        request<TDatasetItem[]>('/local-db/datasets.json'),
                        request<TGalleryItem[]>('/local-db/gallery.json'),
                        request<any>(`https://tracker-api-v1.herokuapp.com/api/items/${APP_NAME}`),
                    ]))
                    const [
                        xsettingsData,
                        homeNavItemsData,
                        datasetItemsData,
                        galleryItemsData,
                        trackerData,
                    ] = res.map(({ data }) => data)

                    appDispatch({
                        type: ':appState/xsettings/PATCH:',
                        payload: {
                            status: ':READY:',
                            data: xsettingsData,
                        },
                    })
                    appDispatch({
                        type: ':appState/homeNavItems/PATCH:',
                        payload: {
                            status: ':READY:',
                            data: homeNavItemsData,
                        },
                    })

                    const downloadsData = Object.entries(trackerData.data).reduce((acc, [key, value]) => {
                        const parsedKey = decodeURIComponent(key.split(';;')?.[2] || '').split('/')
                        let datasetId = ''
                        if (
                            parsedKey.length === 4
                            && parsedKey[0] === ''
                            && parsedKey[1] === 'datasets'
                            && parsedKey[3] === 'download'
                        ) {
                            datasetId = parsedKey[2]
                        }

                        if (datasetId) {
                            return [...acc, [datasetId, Number(value)]]
                        }
                        return acc
                    }, [] as (string | number)[][])

                    const decoratedDatasetsData = (datasetItemsData as TDatasetItem[])
                        .map((item) => {
                            const [, downloads] = downloadsData.find(([id]) => id === item.id) || []
                            if (downloads) {
                                return { ...item, downloads }
                            }
                            return item
                        })
                    appDispatch({
                        type: ':appState/datasets/PATCH:',
                        payload: {
                            status: ':READY:',
                            data: decoratedDatasetsData,
                        },
                    })

                    const viewsData = Object.entries(trackerData.data).reduce((acc, [key, value]) => {
                        const parsedKey = decodeURIComponent(key.split(';;')?.[2] || '').split('/')
                        let galleryId = ''
                        if (
                            parsedKey.length === 3
                            && parsedKey[0] === ''
                            && parsedKey[1] === 'gallery'
                        ) {
                            galleryId = parsedKey[2]
                        }

                        if (galleryId) {
                            return [...acc, [galleryId, Number(value)]]
                        }
                        return acc
                    }, [] as (string | number)[][])

                    const galleryData = (galleryItemsData as TGalleryItem[])
                        .map((item) => {
                            const [, views] = viewsData.find(([id]) => id === item.id) || []
                            if (views) {
                                return { ...item, views }
                            }
                            return item
                        })
                    appDispatch({
                        type: ':appState/gallery/PATCH:',
                        payload: {
                            status: ':READY:',
                            data: galleryData,
                        },
                    })
                }
                catch (reason) {
                    const msg = '::: Init error!'
                    console.error(msg, reason)

                    appDispatch({
                        type: ':appState/xsettings/PATCH:',
                        payload: { status: ':ERROR:' },
                    })
                    appDispatch({
                        type: ':appState/homeNavItems/PATCH:',
                        payload: { status: ':ERROR:' },
                    })
                    appDispatch({
                        type: ':appState/datasets/PATCH:',
                        payload: { status: ':ERROR:' },
                    })
                    appDispatch({
                        type: ':appState/gallery/PATCH:',
                        payload: { status: ':ERROR:' },
                    })

                    return appDispatch({
                        type: ':appState/status/SET:',
                        payload: ':ERROR:',
                    })
                }

                // Ready
                return appDispatch({
                    type: ':appState/status/SET:',
                    payload: ':READY:',
                })
            })()
        }
    }, [appDispatch, appState.status])

    return (
        // <BrowserRouter basename="/ai-art-datasets">
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 0,
                    padding: 0,
                }}
            >
                <TopBar />
                <Box
                    id="app-main"
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 0,
                        // pb: ...,
                        margin: 0,
                        overflow: 'auto',
                    }}
                >
                    {appState.status === ':READY:' ? <AppRoutes /> : <LinearProgress />}
                </Box>
                <Footer />
            </Box>
        </BrowserRouter>
    )
}

export default Content
