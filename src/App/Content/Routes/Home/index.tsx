import { Link } from 'react-router-dom'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { useAppContext } from '../../../app-context/Provider'
import { useAuthContext } from '../../../auth-context/Provider'

import useAuth from '../../../../lib/hooks/use-auth'

import Tos from '../Tos'

import Feedback from './Feedback'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },

    cards: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    link: {
        flex: 1,
        minWidth: 340,
        maxWidth: 340,
        margin: theme.spacing(2),
        textDecoration: 'none',
    },
    card: {
        height: '100%',
    },
    media: {
        height: 180,
    },
}))

function Home() {
    const [appState] = useAppContext()
    const [authState] = useAuthContext()

    const [isAuth]: any = useAuth()

    const classes: any = useStyles()

    return (
        <Container className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                Get started!
            </Typography>

            {/* <Typography align="center" gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae id nostrum fugit perspiciatis ducimus maxime labore sapiente qui impedit voluptate amet incidunt, rem nihil cupiditate porro odit? Aliquam, cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae id nostrum fugit perspiciatis ducimus maxime labore sapiente qui impedit voluptate amet incidunt, rem nihil cupiditate porro odit? Aliquam, cum.
            </Typography> */}

            <Box className={classes.cards}>
                {appState.homeNavItems.data.map(({
                    id, name, description, imgUrl, link, auth,
                }) => ((isAuth && (auth === ':!OPEN:' || (auth === ':ADMIN:' && authState.user.role !== ':ADMIN:')))
                    ? null : (
                        <Link key={id} to={link} className={classes.link}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        image={imgUrl}
                                        title={name}
                                        className={classes.media}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            {name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    )))}
            </Box>

            <Divider />
            <Feedback />
            <Divider />
            <Tos />
        </Container>
    )
}

export default Home
