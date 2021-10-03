import { Dispatch, SetStateAction, useState } from 'react'

import {
    Redirect,
    useLocation,
} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import useAuth from '../../../../lib/hooks/use-auth'

import useCall from '../../../../lib/api/hooks/use-call'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

enum ESubmitButtonStatus {
    Ready = ':READY:',
    Pending = ':PENDING:',
}
type TSubmitButtonStatus = ESubmitButtonStatus.Ready | ESubmitButtonStatus.Pending
type TSubmitButtonStatusTuple = [TSubmitButtonStatus, Dispatch<SetStateAction<TSubmitButtonStatus>>]

const initSbStatus: TSubmitButtonStatus = ESubmitButtonStatus.Ready

function Login() {
    const classes = useStyles()
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
            <div className={classes.root}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <form
                    noValidate
                    className={classes.form}
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
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={submitButtonStatus !== ESubmitButtonStatus.Ready || !username || !password}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default Login
