import { Redirect, useHistory, useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Chip from '@material-ui/core/Chip'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import People from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import HomeIcon from '@material-ui/icons/Home'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

import useDatasets from '../../../../lib/hooks/use-datasets'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },

    actions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textAlign: 'center',
    },

    samples: {
        textAlign: 'center',
    },
    sample: {
        display: 'inline-block',
        width: 256,
        margin: `${theme.spacing(0.25)}px ${theme.spacing(0.5)}px`,
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

    tags: {
        width: 'fit-content',
        minWidth: 180,
        margin: `${theme.spacing(2)}px auto 0 auto`,
        padding: theme.spacing(1),
    },
    tag: {
        margin: theme.spacing(0.25),
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

function DatasetDetails() {
    const history = useHistory()
    const { datasetId }: any = useParams()

    const items = useDatasets()
    const datasetIndex = items.findIndex((item) => item.id === datasetId)

    const classes: any = useStyles()

    if (datasetIndex < 0) {
        return <Redirect to={{ pathname: '/datasets' }} />
    }

    const dataset = items[datasetIndex]

    const nextDatasetIndex = (datasetIndex + 1) % items.length
    const nextDataset = items[nextDatasetIndex]
    const nextDatasetId = nextDataset.id

    let prevDatasetIndex = datasetIndex - 1
    if (prevDatasetIndex < 0) {
        prevDatasetIndex = items.length - 1
    }
    const prevDataset = items[prevDatasetIndex]
    const prevDatasetId = prevDataset.id

    return (
        <Container className={classes.root}>
            <Typography variant="h3" align="center" gutterBottom>
                {dataset.name}
            </Typography>
            <Typography align="center" gutterBottom>
                {dataset.description}
            </Typography>

            <Box className={classes.actions}>
                <Button
                    startIcon={<CloudDownloadIcon />}
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push(`/datasets/${datasetId}/download`)}
                >
                    Download
                </Button>
            </Box>

            <Box className={classes.samples}>
                {dataset.sampleUrls.map((sampleUrl, idx) => (
                    <img
                        key={idx + sampleUrl}
                        src={sampleUrl}
                        alt={`sample-item-${idx}`}
                        className={classes.sample}
                    />
                ))}
            </Box>

            <Paper className={classes.moreInfo}>
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <Typography className={classes.moreInfo__col1__text}>
                            License
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {dataset.license}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <Typography className={classes.moreInfo__col1__text}>
                            Version
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {dataset.version}
                            &nbsp;
                            {String(new Date(dataset.updatedAt).getFullYear()).substr(-2)}
                            -
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(dataset.updatedAt).getMonth()]}
                            -
                            {new Date(dataset.updatedAt).getDate()}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <Typography className={classes.moreInfo__col1__text}>
                            Images
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {dataset.itemsNumber}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <Typography className={classes.moreInfo__col1__text}>
                            Resolution
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {dataset.resolution.width}
                            &nbsp;x&nbsp;
                            {dataset.resolution.height}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <Typography className={classes.moreInfo__col1__text}>
                            Format
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {dataset.imageFormat}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        {
                            dataset.authors.length === 1
                                ? <PersonIcon className={classes.moreInfo__col1__icon} />
                                : <People className={classes.moreInfo__col1__icon} />
                        }
                        <Typography className={classes.moreInfo__col1__text}>
                            {dataset.authors.length === 1 ? 'Author' : 'Authors'}
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography>
                            {dataset.authors.join(', ')}
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
                            onClick={() => window.open(dataset.externalUrl)}
                        >
                            {dataset.externalUrl}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.moreInfo__row}>
                    <Box className={`${classes.moreInfo__col1} ${classes.moreInfo__cell}`}>
                        <CloudDownloadIcon className={classes.moreInfo__col1__icon} />
                        <Typography className={classes.moreInfo__col1__text}>
                            Downloads
                        </Typography>
                    </Box>
                    <Box className={classes.moreInfo__cell}>
                        <Typography className={classes.moreInfo__col2__text}>
                            {dataset.downloads}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper className={classes.tags}>
                {dataset.tags.map((tag, idx) => (
                    <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        variant="outlined"
                        className={classes.tag}
                    />
                ))}
            </Paper>

            <ButtonGroup
                aria-label="prev/next navigation group"
                size="small"
                className={classes.navButtonGroup}
            >
                <Button
                    disabled={!items.length}
                    onClick={() => history.push(`/datasets/${prevDatasetId}`)}
                >
                    <NavigateBeforeIcon />
                    &nbsp;Prev
                </Button>
                <Button onClick={() => history.push('/')}>
                    <HomeIcon />
                </Button>
                <Button
                    disabled={!items.length}
                    onClick={() => history.push(`/datasets/${nextDatasetId}`)}
                >
                    Next&nbsp;
                    <NavigateNextIcon />
                </Button>
            </ButtonGroup>
        </Container>
    )
}

export default DatasetDetails
