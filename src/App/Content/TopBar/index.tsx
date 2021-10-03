import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import useAuth from '../../../lib/hooks/use-auth'

import { useAppContext } from '../../app-context/Provider'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    link: {
        textDecoration: 'none',
    },
    title: {
        flexGrow: 1,
        color: theme.palette.common.white,
    },
}))

function TopBar() {
    const [appState] = useAppContext()

    const history = useHistory()

    const [isAuth] = useAuth()

    const classes: any = useStyles({ topBarHeight: appState.ui.topBar.height })

    return (
        <AppBar position="static">
            <Toolbar>
                <Container className={classes.root}>
                    <Link to="/" className={classes.link}>
                        <Typography variant="h6" className={classes.title}>
                            AI Art Datasets
                        </Typography>
                    </Link>

                    {isAuth ? (
                        <Button
                            color="inherit"
                            onClick={() => history.push('/logout')}
                        >
                            Logout
                        </Button>
                    ) : (
                        null
                        // <Button
                        //     color="inherit"
                        //     onClick={() => history.push('/login')}
                        // >
                        //     Login
                        // </Button>
                    )}
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar
