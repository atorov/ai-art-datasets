import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
// import PropTypes, { InferProps } from 'prop-types'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// type Props = InferProps<typeof ErrorBoundary.propTypes>
type Props = {
    children: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    // public static propTypes: any = {
    //     children: PropTypes.oneOfType([
    //         PropTypes.arrayOf(PropTypes.node),
    //         PropTypes.node,
    //     ]).isRequired,
    // }

    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error,
        }
    }

    public async componentDidCatch(error: Error, info: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error('::: Error:', error, info)
    }

    public render() {
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
