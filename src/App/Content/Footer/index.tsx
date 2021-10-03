import { Link, useHistory } from 'react-router-dom'

import { makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import TwitterIcon from '@material-ui/icons/Twitter'

import { useAppContext } from '../../app-context/Provider'

const useStyles = makeStyles((theme: Theme) => ({
    root: (styleProps: any) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        justifyContent: 'center',
        minHeight: styleProps.footerHeight,
        maxHeight: styleProps.footerHeight,
        minWidth: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 4,
        background: theme.palette.background.paper,
        textAlign: 'center',
    }),

    text: {
        cursor: 'pointer',
    },
    twitterIcon: {
        fontSize: 14,
    },

    vdivider: {
        margin: `0 ${theme.spacing(1)}px`,
    },

    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:visited': {
            color: theme.palette.text.primary,
        },
        '&:hover': {
            color: theme.palette.text.primary,
        },
        '&:active': {
            color: theme.palette.text.primary,
        },
    },
}))

function Footer() {
    const [appState] = useAppContext()

    const history = useHistory()

    const classes: any = useStyles({ footerHeight: appState.ui.footer.height })

    return (
        <Container className={classes.root}>
            <Typography
                component="p"
                variant="caption"
                className={classes.text}
                onClick={() => history.push('/feedback/redirect')}
            >
                © Atorov 2020-2021
            </Typography>

            <Divider
                orientation="vertical"
                flexItem
                className={classes.vdivider}
            />
            <Typography
                component="p"
                variant="caption"
                className={classes.text}
                onClick={() => history.push('/feedback/redirect')}
            >
                &nbsp;
                <TwitterIcon className={classes.twitterIcon} />
            </Typography>

            <Divider
                orientation="vertical"
                flexItem
                className={classes.vdivider}
            />
            <Link to="/tos" className={classes.link}>
                <Typography
                    component="p"
                    variant="caption"
                    className={classes.text}
                >
                    Terms of use
                </Typography>
            </Link>

        </Container>
    )
}

export default Footer
