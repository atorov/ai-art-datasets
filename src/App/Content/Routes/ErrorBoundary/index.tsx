import { Component } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

class ErrorBoundary extends Component<InferProps<typeof ErrorBoundary.propTypes>, any> {
    // eslint-disable-next-line react/static-property-placement
    public static propTypes: any = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired,
    }

    constructor(props: any) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error,
        }
    }

    async componentDidCatch(error: any, info: any) {
        // You can also log the error to an error reporting service
        console.error('::: Error:', error, info)
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children
        }

        // You can render any custom fallback UI
        return (
            <Container>
                <Typography
                    variant="h3"
                    sx={{
                        mt: 6,
                        color: (theme) => theme.palette.error.dark,
                    }}
                >
                    Something went wrong!
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: (theme) => theme.palette.error.dark }}
                >
                    Please try again later or contact support
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.error.main }}>
                    {String(this.state.error)}
                </Typography>
            </Container>
        )
    }
}

export default ErrorBoundary
