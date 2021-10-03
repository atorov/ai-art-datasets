import PropTypes, { InferProps } from 'prop-types'

import { Redirect, Route } from 'react-router-dom'

import useAuth from '../../../../lib/hooks/use-auth'

function RenderPropWrapper(ownProps: any) {
    const [isAuth] = useAuth()

    return (renderProps: any) => {
        const combinedProps = { ...renderProps, ...ownProps }
        const { PrivateComponent, ...rest } = combinedProps

        if (isAuth) {
            return <PrivateComponent {...rest} />
        }

        return (
            <Redirect
                to={{
                    pathname: '/login',
                    search: combinedProps.location.search,
                    state: { from: combinedProps.location },
                }}
            />
        )
    }
}

const PrivateRoute: any = (props: InferProps<typeof PrivateRoute.propTypes>) => (
    <Route
        {...props}
        render={RenderPropWrapper(props)}
    />
)

PrivateRoute.propTypes = {
    PrivateComponent: PropTypes.any.isRequired,

    location: PropTypes.object,
}

PrivateRoute.defaultProps = {
    location: {},
}

export default PrivateRoute
