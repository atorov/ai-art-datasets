import * as React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import useCall from '../../../../../lib/api/hooks/use-call'
import { useAuthContext } from '../../../../auth-context/Provider'

const UserDetails = () => {
    const [authState] = useAuthContext()
    const [user, setUser] = React.useState({} as any)
    const call = useCall()

    React.useEffect(() => {
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
        <Container
            sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <TableContainer component={Paper} sx={{ width: '340px' }}>
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
