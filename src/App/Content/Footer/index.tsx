import { Link, useNavigate } from 'react-router-dom'
import { styled, useTheme, Theme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useAppContext } from '../../app-context/Provider'

declare const APP_VERSION: string

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
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

const Footer = () => {
    const [appState] = useAppContext()

    const navigate = useNavigate()
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
                background: theme.palette.background.paper,
            }}
        >
            <Typography
                component="p"
                variant="caption"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/feedback/redirect')}
            >
                © Atorov 2020-2023
            </Typography>
            <Typography
                component="p"
                variant="caption"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/feedback/redirect')}
            >
                &nbsp;|&nbsp;
                {APP_VERSION}
                &nbsp;|
            </Typography>

            <Typography
                component="p"
                variant="caption"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/feedback/redirect')}
            >
                &nbsp;
                <TwitterIcon
                    sx={{
                        margin: '0 8px',
                        fontSize: '14px',
                    }}
                />
            </Typography>

            <StyledLink to="/tos">
                <Typography
                    component="p"
                    variant="caption"
                    sx={{ cursor: 'pointer' }}
                >
                    | Terms of use
                </Typography>
            </StyledLink>
        </Container>
    )
}

export default Footer
