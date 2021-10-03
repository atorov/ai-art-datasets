import { useEffect } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

import request from '../../lib/api/request'
import type { TDataset } from '../../types/TDataset'

import { useAppContext } from '../app-context/Provider'
import { useAuthContext } from '../auth-context/Provider'

import Footer from './Footer'
import Routes from './Routes'
import TopBar from './TopBar'

declare const APP_NAME: string

const useStyles = makeStyles((theme) => ({
    appMain: () => ({
        flexGrow: 1,
        padding: 0,
        paddingBottom: theme.spacing(8),
        margin: 0,
        overflow: 'auto',
    }),
    appContainer: {
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
    },
}))

function Content() {
    const [appState, appDispatch] = useAppContext()
    console.log('::: appState:', appState)

    const [authState] = useAuthContext()
    console.log('::: authState:', authState)

    const classes: any = useStyles({ topBarHeight: appState.ui.topBar.height })

    // Init
    useEffect(() => {
        if (appState.status === ':START_INIT:') {
            appDispatch({
                type: ':appState/status/SET:',
                payload: ':INIT:',
            });

            (async () => {
                try {
                    const data = (await Promise.all([
                        request('/local-db/xsettings.json'),
                        request('/local-db/home-nav-items.json'),
                        request('/local-db/datasets.json'),
                        request('/local-db/gallery.json'),
                        request(`https://tracker-api-v1.herokuapp.com/api/items/${APP_NAME}`),
                    ])).map((item) => item.data)

                    appDispatch({
                        type: ':appState/xsettings/PATCH:',
                        payload: {
                            status: ':READY:',
                            data: data[0],
                        },
                    })
                    appDispatch({
                        type: ':appState/homeNavItems/PATCH:',
                        payload: {
                            status: ':READY:',
                            data: data[1],
                        },
                    })

                    const downloadsData = Object.entries(data[4].data).reduce((acc, [key, value]) => {
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

                    const datasetsData = data[2].map((item: TDataset) => {
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
                            data: datasetsData,
                        },
                    })

                    const viewsData = Object.entries(data[4].data).reduce((acc, [key, value]) => {
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

                    const galleryData = data[3]
                        .map((item: TDataset) => {
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
            <div className={classes.appContainer}>
                <TopBar />

                <main id="app-main" className={classes.appMain}>
                    {appState.status === ':READY:' ? <Routes /> : <LinearProgress />}
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default Content
