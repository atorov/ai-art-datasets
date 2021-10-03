import { Dispatch, SetStateAction, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
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
type TSubmitButtonStatusTuple = [TSubmitButtonStatus, Dispatch<SetStateAction<TSubmitButtonStatus>>]

const initSbStatus: TSubmitButtonStatus = ESubmitButtonStatus.Ready

function Login() {
    const location = useLocation()

    const [isAuth, auth]: any = useAuth()
    const call = useCall()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitButtonStatus, setSubmitButtonStatus]: TSubmitButtonStatusTuple = useState(initSbStatus)

    if (isAuth) {
        const { from }: any = location.state || { from: { pathname: '/' } }
        return <Redirect to={from} />
    }

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
                        variant="outlined"
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
                        variant="outlined"
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
