import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useAppContext } from '../../../app-context/Provider'
import { useAuthContext } from '../../../auth-context/Provider'
import useAuth from '../../../../lib/hooks/use-auth'
import Tos from '../Tos'
import Feedback from './Feedback'

const Home = () => {
    const [appState] = useAppContext()
    const [authState] = useAuthContext()

    const [isAuth] = useAuth()

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Get started!
            </Typography>

            {/* <Typography align="center" gutterBottom>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae id nostrum fugit perspiciatis ducimus maxime labore sapiente qui impedit voluptate amet incidunt, rem nihil cupiditate porro odit? Aliquam, cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae id nostrum fugit perspiciatis ducimus maxime labore sapiente qui impedit voluptate amet incidunt, rem nihil cupiditate porro odit? Aliquam, cum.
            </Typography> */}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {appState.homeNavItems.data.map(({
                    id, name, description, imgUrl, link, auth,
                }) => ((isAuth && (auth === ':!OPEN:' || (auth === ':ADMIN:' && authState.user.role !== ':ADMIN:')))
                    ? null : (
                        <Link
                            key={id}
                            to={link}
                            style={{
                                flex: 1,
                                minWidth: 340,
                                maxWidth: 340,
                                margin: '16px',
                                textDecoration: 'none',
                            }}
                        >
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea>
                                    <CardMedia
                                        image={imgUrl}
                                        title={name}
                                        sx={{ height: '180px' }}
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
