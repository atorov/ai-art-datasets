import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
}))

function Tos() {
    const classes: any = useStyles()

    return (
        <Container className={classes.root}>
            <Alert severity="info">
                <AlertTitle>
                    Terms of use
                </AlertTitle>

                <strong>
                    Please use the resources provided by this site under the indicated licenses.
                </strong>
                <br />
                <br />

                At this time, the content provided in the&nbsp;
                <strong>
                    Datasets
                </strong>
                &nbsp;section is offered under a Creative Commons license
                (CC BY-NC-ND: author is required;
                no commercial - no commercial use is allowed;
                no derivatives - no changes are allowed ).
                It is suitable for personal use, for educational purposes or just for fun.
                <br />
                <br />

                Note that the resources in the&nbsp;
                <strong>
                    Gallery
                </strong>
                &nbsp;section and all others for which no explicit license is specified
                are the property of their authors.
                Please do not distribute, share or copy these materials
                without the express consent of their authors.
                If you like their work, contact them on the addresses provided for each item.
                <br />
                <br />

                <strong>
                    Enjoy! 😎
                </strong>
            </Alert>
        </Container>
    )
}

export default Tos
