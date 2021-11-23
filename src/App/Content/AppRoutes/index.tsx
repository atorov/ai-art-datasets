import * as React from 'react'
import { Suspense } from 'react'
import {
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import useTracker from '../../../lib/hooks/use-tracker'
import ErrorBoundary from './ErrorBoundary'
import Fallback from './Fallback'
import PrivateRoute from './PrivateRoute'

const CFeedbackRedirect = React.lazy(() => import('./FeedbackRedirect'))
const CDatasets = React.lazy(() => import('./Datasets'))
const CDatasetDetails = React.lazy(() => import('./DatasetDetails'))
const CDatasetDownload = React.lazy(() => import('./DatasetDetails/DatasetDownload'))
const CGallery = React.lazy(() => import('./Gallery'))
const CGalleryItemDetails = React.lazy(() => import('./GalleryItemDetails'))
const CHome = React.lazy(() => import('./Home'))
const CLogin = React.lazy(() => import('./Login'))
const CLogout = React.lazy(() => import('./Logout'))
const CTos = React.lazy(() => import('./Tos'))
const CAdminConsole = React.lazy(() => import('./Users/AdminConsole'))
const CUserDetails = React.lazy(() => import('./Users/UserDetails'))
const CUserProfile = React.lazy(() => import('./Users/Profile'))

const AppRoutes = () => {
    const location = useLocation()

    React.useEffect(() => {
        // window.scrollTo(0, 0))
        // document.querySelector('#app-main').scrollTo(0, 0) // <-- Doesn't work in IE11

        const el = document.querySelector('#app-main')
        if (typeof el?.scrollTo === 'function') {
            el.scrollTo(0, 0)
        }
        // else if (el?.scrollTop === 'number') {
        //     el.scrollTop = 0
        // }
    }, [location.pathname])

    useTracker()

    return (
        <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    <Route path="/*" element={<CHome />} />

                    <Route path="/gallery" element={<CGallery />} />
                    <Route path="/gallery/:galleryItemId" element={<CGalleryItemDetails />} />

                    <Route path="/datasets" element={<CDatasets />} />
                    <Route path="/datasets/:datasetId" element={<CDatasetDetails />} />
                    <Route path="/datasets/:datasetId/download" element={<CDatasetDownload />} />

                    <Route path="/login" element={<CLogin />} />
                    <Route path="/logout" element={<CLogout />} />

                    <Route
                        path="/users/_admin"
                        element={<PrivateRoute><CAdminConsole /></PrivateRoute>}
                    />
                    <Route
                        path="/users/_profile"
                        element={<PrivateRoute><CUserProfile /></PrivateRoute>}
                    />
                    <Route
                        path="/users/:uid"
                        element={<PrivateRoute><CUserDetails /></PrivateRoute>}
                    />

                    <Route path="/tos" element={<CTos />} />

                    <Route path="/feedback/redirect" element={<CFeedbackRedirect />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}

export default AppRoutes
