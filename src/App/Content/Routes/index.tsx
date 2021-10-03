import {
    lazy, Suspense, useEffect, useRef,
} from 'react'

import {
    Redirect,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom'

import useTracker from '../../../lib/hooks/use-tracker'

import ErrorBoundary from './ErrorBoundary'
import Fallback from './Fallback'
import PrivateRoute from './PrivateRoute'

const CFeedbackRedirect = lazy(() => import('./FeedbackRedirect'))
const CDatasets = lazy(() => import('./Datasets'))
const CDatasetDetails = lazy(() => import('./DatasetDetails'))
const CDatasetDownload = lazy(() => import('./DatasetDetails/DatasetDownload'))
const CGallery = lazy(() => import('./Gallery'))
const CGalleryItemDetails = lazy(() => import('./GalleryItemDetails'))
const CHome = lazy(() => import('./Home'))
const CLogin = lazy(() => import('./Login'))
const CLogout = lazy(() => import('./Logout'))
const CTos = lazy(() => import('./Tos'))
const CAdminConsole = lazy(() => import('./Users/AdminConsole'))
const CUserDetails = lazy(() => import('./Users/UserDetails'))
const CUserProfile = lazy(() => import('./Users/Profile'))

function Routes() {
    const unlistenRef: any = useRef()

    const history = useHistory()

    useEffect(() => {
        // unlistenRef.current = history.listen(() => window.scrollTo(0, 0))
        // unlisten.current = history.listen(() => document.querySelector('#app-main').scrollTo(0, 0)) // <-- Doesn't work in IE11

        unlistenRef.current = history.listen(() => {
            const el = document.querySelector('#app-main')
            if (typeof el?.scrollTo === 'function') {
                el.scrollTo(0, 0)
            }
            // else if (el?.scrollTop === 'number') {
            //     el.scrollTop = 0
            // }
        })

        return () => unlistenRef.current()
    }, [history])

    useTracker()

    return (
        <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
                <Switch>
                    <Route path={['/', '/home']} exact>
                        <CHome />
                    </Route>

                    <Route path="/gallery" exact>
                        <CGallery />
                    </Route>
                    <Route path="/gallery/:galleryItemId" exact>
                        <CGalleryItemDetails />
                    </Route>

                    <Route path="/datasets" exact>
                        <CDatasets />
                    </Route>
                    <Route path="/datasets/:datasetId" exact>
                        <CDatasetDetails />
                    </Route>
                    <Route path="/datasets/:datasetId/download" exact>
                        <CDatasetDownload />
                    </Route>

                    <Route path="/login" exact>
                        <CLogin />
                    </Route>
                    <Route path="/logout" exact>
                        <CLogout />
                    </Route>

                    <PrivateRoute
                        path="/users/_admin"
                        exact
                        PrivateComponent={CAdminConsole}
                    />
                    <PrivateRoute
                        path="/users/_profile"
                        exact
                        PrivateComponent={CUserProfile}
                    />
                    <PrivateRoute
                        path="/users/:uid"
                        exact
                        PrivateComponent={CUserDetails}
                    />

                    <Route path="/tos" exact>
                        <CTos />
                    </Route>

                    <Route path="/feedback/redirect" exact>
                        <CFeedbackRedirect />
                    </Route>

                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    )
}

export default Routes
