import { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'

import useCall from '../../../../../lib/api/hooks/use-call'

import { useAuthContext } from '../../../../auth-context/Provider'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        width: 340,
    },
}));

function UserDetails() {
    const [authState] = useAuthContext()

    const call = useCall()

    const [user, setUser] = useState({} as any)

    const classes = useStyles()

    useEffect(() => {
        (async () => {
            try {
                const res = await call(`/users/${authState.user.id}`)
                setUser(res.data)
            }
            catch (reason) {
                const msg = '::: Could not read user details!'
                console.error(msg, reason)
            }
        })()
    }, [authState.user.id, call])

    const username = user.name || 'Loading...'
    const role: string = ({
        ':USER:': 'User',
        ':ADMIN:': 'Admin',
    } as any)[user.role] || 'N/A'

    return (
        <Container className={classes.root}>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="user details table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Username:
                            </TableCell>
                            <TableCell align="right">
                                {username}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Role:
                            </TableCell>
                            <TableCell align="right">
                                {role}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default UserDetails
