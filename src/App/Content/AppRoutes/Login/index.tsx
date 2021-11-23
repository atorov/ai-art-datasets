import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import useAuth from '../../../../lib/hooks/use-auth'
import useCall from '../../../../lib/api/hooks/use-call'

enum ESubmitButtonStatus {
    Ready = ':READY:',
    Pending = ':PENDING:',
}
type TSubmitButtonStatus = ESubmitButtonStatus.Ready | ESubmitButtonStatus.Pending

const initSbStatus: TSubmitButtonStatus = ESubmitButtonStatus.Ready

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [isAuth, auth] = useAuth()
    const call = useCall()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [submitButtonStatus, setSubmitButtonStatus] = React.useState<TSubmitButtonStatus>(initSbStatus)

    const from = location.state?.from?.pathname || '/'
    console.log('@@@ $$ ::: TODO: from:', from)

    React.useEffect(() => {
        if (isAuth) {
            console.log('@@@ $$ ::: TODO: to:', from)
            navigate(from, { replace: true })
        }
    }, [from, isAuth, navigate])

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        backgroundColor: (theme) => theme.palette.secondary.main,
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <form
                    noValidate
                    style={{
                        width: '100%', // Fix IE 11 issue.
                        marginTop: '8px',
                    }}
                    onSubmit={async (event) => {
                        event.preventDefault()
                        setSubmitButtonStatus(ESubmitButtonStatus.Pending)

                        let res
                        try {
                            res = await call('/auth', { method: 'POST', data: { name: username, password } })
                            const {
                                accessToken, name, role, userId,
                            } = res.data
                            auth(true, { accessToken, user: { id: userId, name, role } })
                        }
                        catch (reason) {
                            const msg = '::: Login error!'
                            console.error(msg, reason)
                            auth(false)
                            setUsername('')
                            setPassword('')
                            setSubmitButtonStatus(ESubmitButtonStatus.Ready)
                        }
                    }}
                >
                    <TextField
                        id="username"
                        name="username"
                        autoComplete="username"
                        label="Username"
                        margin="normal"
                        fullWidth
                        autoFocus
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        label="Password"
                        margin="normal"
                        fullWidth
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={submitButtonStatus !== ESubmitButtonStatus.Ready || !username || !password}
                        sx={{ mx: 0, my: 3 }}
                    >
                        Sign In
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default Login
