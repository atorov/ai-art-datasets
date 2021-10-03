import { Link, useHistory } from 'react-router-dom'
import { useTheme, styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useAppContext } from '../../app-context/Provider'

const StyledLink = styled(Link)(({ theme }) => ({
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
}))

function Footer() {
    const [appState] = useAppContext()

    const history = useHistory()
    const theme = useTheme()

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'end',
                justifyContent: 'center',
                minHeight: appState.ui.footer.height,
                maxHeight: appState.ui.footer.height,
                minWidth: '100%',
                maxWidth: '100%',
                margin: 0,
                padding: 4,
                background: theme.palette.background.paper,
                textAlign: 'center',
            }}
        >
            <Typography
                component="p"
                variant="caption"
                sx={{ cursor: 'pointer' }}
                onClick={() => history.push('/feedback/redirect')}
            >
                © Atorov 2020-2021
            </Typography>

            <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: `0 ${theme.spacing(1)}px` }}
            />
            <Typography
                component="p"
                variant="caption"
                sx={{ cursor: 'pointer' }}
                onClick={() => history.push('/feedback/redirect')}
            >
                &nbsp;
                <TwitterIcon sx={{ fontSize: '14px' }} />
            </Typography>

            <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: `0 ${theme.spacing(1)}px` }}
            />
            <StyledLink to="/tos">
                <Typography
                    component="p"
                    variant="caption"
                    sx={{ cursor: 'pointer' }}
                >
                    Terms of use
                </Typography>
            </StyledLink>

        </Container>
    )
}

export default Footer
