import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'

const Feedback = () => {
    const navigate = useNavigate()

    return (
        <Container sx={{ my: 4 }}>
            <Alert
                severity="success"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/feedback/redirect')}
            >
                <AlertTitle>
                    We value your feedback
                </AlertTitle>

                Your feedback will help us improve the service.
                <br />

                Tell us what you think.
                If you want to share your thoughts or join the project,
                send us a message.
                <br />

                <TwitterIcon />
                <Typography component="p" variant="caption">
                    Confusion Circles
                    (@confusion.circles)
                </Typography>
            </Alert>
        </Container>
    )
}

export default Feedback
