import { useHistory } from 'react-router-dom'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TwitterIcon from '@material-ui/icons/Twitter'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },

    text: {
        cursor: 'pointer',
    },
}))

function Feedback() {
    const history = useHistory()

    const classes: any = useStyles()

    return (
        <Container className={classes.root}>
            <Alert
                severity="success"
                className={classes.text}
                onClick={() => history.push('/feedback/redirect')}
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
                <Typography
                    component="p"
                    variant="caption"
                >
                    Confusion Circles
                    (@confusion.circles)
                </Typography>
            </Alert>
        </Container>
    )
}

export default Feedback
