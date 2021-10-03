import { Redirect, useHistory, useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import People from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import VisibilityIcon from '@material-ui/icons/Visibility'

import useGalleryItems from '../../../../lib/hooks/use-gallery-items'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },

    artwork: {
        display: 'block',
        width: 512,
        maxWidth: '100%',
        marginTop: theme.spacing(2),
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    },

    moreInfo: {
        width: 'fit-content',
        maxWidth: '100%',
        marginTop: theme.spacing(2),
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    },
    moreInfo__row: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: 180,
    },
    moreInfo__col1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 160,
        minWidth: 160,
    },
    moreInfo__col1__icon: {
        paddingRight: theme.spacing(1),
    },
    moreInfo__col1__text: {
        fontWeight: 800,
    },
    moreInfo__col2__text: {
        wordBreak: 'break-word',
        cursor: 'pointer',
    },
    moreInfo__cell: {
        padding: theme.spacing(1),
    },

    navButtonGroup: {
        display: 'block',
        width: 'fit-content',
        marginTop: theme.spacing(2),
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
    },
}))

function GalleryItemDetails() {
    const history = useHistory()
    const { galleryItemId }: any = useParams()

    const items = useGalleryItems()
    const galleryItemIndex = items.findIndex((item) => item.id === galleryItemId)

    const classes: any = useStyles()

    if (galleryItemIndex < 0) {
        return <Redirect to={{ pathname: '/gallery' }} />
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
        <Container className={classes.root}>
            <Typography variant="h3" align="center" gutterBottom>
                {galleryItem.name}
            </Typography>
            <Typography align="center" gutterBottom>
                {galleryItem.description}
            </Typography>

            <img
                src={galleryItem.url}
                alt="gallery-item"
                className={classes.artwork}
            />

            <Paper className={classes.moreInfo}>
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        {
                            galleryItem.authors.length === 1
                                ? <PersonIcon className={classes.moreInfo__col1__icon} />
                                : <People className={classes.moreInfo__col1__icon} />
                        }
                        <Typography className={classes.moreInfo__col1__text}>
                            {galleryItem.authors.length === 1 ? 'Author' : 'Authors'}
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography>
                            {galleryItem.authors.join(', ')}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <OpenInNewIcon className={classes.moreInfo__col1__icon} />
                        <Typography className={classes.moreInfo__col1__text}>
                            External URL
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography
                            className={classes.moreInfo__col2__text}
                            onClick={() => window.open(galleryItem.externalUrl)}
                        >
                            {galleryItem.externalUrl}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <VisibilityIcon className={classes.moreInfo__col1__icon} />
                        <Typography className={classes.moreInfo__col1__text}>
                            Views
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {galleryItem.views}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <ButtonGroup
                aria-label="prev/next navigation group"
                size="small"
                className={classes.navButtonGroup}
            >
                <Button
                    disabled={!items.length}
                    onClick={() => history.push(`/gallery/${prevGalleryItemId}`)}
                >
                    <NavigateBeforeIcon />
                    &nbsp;Prev
                </Button>
                <Button onClick={() => history.push('/')}>
                    <HomeIcon />
                </Button>
                <Button
                    disabled={!items.length}
                    onClick={() => history.push(`/gallery/${nextGalleryItemId}`)}
                >
                    Next&nbsp;
                    <NavigateNextIcon />
                </Button>
            </ButtonGroup>
        </Container>
    )
}

export default GalleryItemDetails
