import {
    lazy,
    Suspense,
    useEffect,
} from 'react'

import {
    Route,
    Routes,
    useLocation,
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

function AppRoutes() {
    const location = useLocation()

    useEffect(() => {
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
