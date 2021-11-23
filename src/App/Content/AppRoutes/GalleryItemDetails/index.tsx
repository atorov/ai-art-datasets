import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import People from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VisibilityIcon from '@mui/icons-material/Visibility'
import useGalleryItems from '../../../../lib/hooks/use-gallery-items'

const GalleryItemDetails = () => {
    const navigate = useNavigate()
    const { galleryItemId } = useParams()

    const items = useGalleryItems()
    const galleryItemIndex = items.findIndex((item) => item.id === galleryItemId)

    if (galleryItemIndex < 0) {
        return <Navigate to={{ pathname: '/gallery' }} />
    }

    const galleryItem = items[galleryItemIndex]

    const nextGalleryItemIndex = (galleryItemIndex + 1) % items.length
    const nextGalleryItem = items[nextGalleryItemIndex]
    const nextGalleryItemId = nextGalleryItem.id

    let prevGalleryItemIndex = galleryItemIndex - 1
    if (prevGalleryItemIndex < 0) {
        prevGalleryItemIndex = items.length - 1
    }
    const prevGalleryItem = items[prevGalleryItemIndex]
    const prevGalleryItemId = prevGalleryItem.id

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                {galleryItem.name}
            </Typography>
            <Typography align="center" gutterBottom>
                {galleryItem.description}
            </Typography>

            <img
                src={galleryItem.url}
                alt="gallery-item"
                style={{
                    display: 'block',
                    width: '512px',
                    maxWidth: '100%',
                    marginTop: '16px',
                    marginRight: 'auto',
                    marginBottom: 0,
                    marginLeft: 'auto',
                }}
            />

            <Paper
                sx={{
                    width: 'fit-content',
                    maxWidth: '100%',
                    mt: 2,
                    marginRight: 'auto',
                    marginBottom: 0,
                    marginLeft: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minWidth: '180px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '160px',
                            minWidth: '160px',
                            p: 1,
                        }}
                    >
                        {
                            galleryItem.authors.length === 1
                                ? <PersonIcon sx={{ pr: 1 }} />
                                : <People sx={{ pr: 1 }} />
                        }
                        <Typography sx={{ fontWeight: 800 }}>
                            {galleryItem.authors.length === 1 ? 'Author' : 'Authors'}
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography>
                            {galleryItem.authors.join(', ')}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minWidth: '180px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '160px',
                            minWidth: '160px',
                            p: 1,
                        }}
                    >
                        <OpenInNewIcon sx={{ pr: 1 }} />
                        <Typography sx={{ fontWeight: 800 }}>
                            External URL
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography
                            sx={{
                                wordBreak: 'break-word',
                                cursor: 'pointer',
                            }}
                            onClick={() => window.open(galleryItem.externalUrl)}
                        >
                            {galleryItem.externalUrl}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minWidth: '180px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '160px',
                            minWidth: '160px',
                            p: 1,
                        }}
                    >
                        <VisibilityIcon sx={{ pr: 1 }} />
                        <Typography sx={{ fontWeight: 800 }}>
                            Views
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography
                            sx={{
                                wordBreak: 'break-word',
                                cursor: 'pointer',
                            }}
                        >
                            {galleryItem.views}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <ButtonGroup
                aria-label="prev/next navigation group"
                size="small"
                sx={{
                    display: 'block',
                    width: 'fit-content',
                    mt: 2,
                    marginRight: 'auto',
                    marginBottom: 0,
                    marginLeft: 'auto',
                }}
            >
                <Button
                    disabled={!items.length}
                    onClick={() => navigate(`/gallery/${prevGalleryItemId}`)}
                >
                    <NavigateBeforeIcon />
                    &nbsp;Prev
                </Button>
                <Button onClick={() => navigate('/')}>
                    <HomeIcon />
                </Button>
                <Button
                    disabled={!items.length}
                    onClick={() => navigate(`/gallery/${nextGalleryItemId}`)}
                >
                    Next&nbsp;
                    <NavigateNextIcon />
                </Button>
            </ButtonGroup>
        </Container>
    )
}

export default GalleryItemDetails
