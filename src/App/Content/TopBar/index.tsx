import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useAuth from '../../../lib/hooks/use-auth'

function TopBar() {
    const navigate = useNavigate()
    const [isAuth] = useAuth()

    return (
        <AppBar position="static">
            <Toolbar>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                flexGrow: 1,
                                color: (theme) => theme.palette.common.white,
                            }}
                        >
                            AI Art Datasets
                        </Typography>
                    </Link>

                    {isAuth ? (
                        <Button
                            color="inherit"
                            onClick={() => navigate('/logout')}
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
