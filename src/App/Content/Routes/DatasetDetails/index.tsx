import { Redirect, useHistory, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import People from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import HomeIcon from '@mui/icons-material/Home'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import useDatasets from '../../../../lib/hooks/use-datasets'

function DatasetDetails() {
    const history = useHistory()
    const { datasetId }: any = useParams()

    const items = useDatasets()
    const datasetIndex = items.findIndex((item) => item.id === datasetId)

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
        <Container sx={{ mt: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                {dataset.name}
            </Typography>
            <Typography align="center" gutterBottom>
                {dataset.description}
            </Typography>

            <Box
                sx={{
                    mt: 1,
                    mb: 1,
                    textAlign: 'center',
                }}
            >
                <Button
                    startIcon={<CloudDownloadIcon />}
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push(`/datasets/${datasetId}/download`)}
                >
                    Download
                </Button>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
                {dataset.sampleUrls.map((sampleUrl, idx) => (
                    <img
                        key={idx + sampleUrl}
                        src={sampleUrl}
                        alt={`sample-item-${idx}`}
                        style={{
                            display: 'inline-block',
                            width: '256px',
                            margin: '2px 2px',
                        }}
                    />
                ))}
            </Box>

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
                        <Typography sx={{ fontWeight: 800 }}>
                            License
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{
                            wordBreak: 'break-word',
                            cursor: 'pointer',
                        }}
                        >
                            {dataset.license}
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
                        <Typography sx={{ fontWeight: 800 }}>
                            Version
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{
                            wordBreak: 'break-word',
                            cursor: 'pointer',
                        }}
                        >
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
                        <Typography sx={{ fontWeight: 800 }}>
                            Images
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{
                            wordBreak: 'break-word',
                            cursor: 'pointer',
                        }}
                        >
                            {dataset.itemsNumber}
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
                        <Typography sx={{ fontWeight: 800 }}>
                            Resolution
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{
                            wordBreak: 'break-word',
                            cursor: 'pointer',
                        }}
                        >
                            {dataset.resolution.width}
                            &nbsp;x&nbsp;
                            {dataset.resolution.height}
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
                        <Typography sx={{ fontWeight: 800 }}>
                            Format
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{
                            wordBreak: 'break-word',
                            cursor: 'pointer',
                        }}
                        >
                            {dataset.imageFormat}
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '160px',
                        minWidth: '160px',
                        p: 1,
                    }}
                    >
                        {
                            dataset.authors.length === 1
                                ? <PersonIcon sx={{ pr: 1 }} />
                                : <People sx={{ pr: 1 }} />
                        }
                        <Typography sx={{ fontWeight: 800 }}>
                            {dataset.authors.length === 1 ? 'Author' : 'Authors'}
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography>
                            {dataset.authors.join(', ')}
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
                            onClick={() => window.open(dataset.externalUrl)}
                        >
                            {dataset.externalUrl}
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
                        <CloudDownloadIcon sx={{ pr: 1 }} />
                        <Typography sx={{ fontWeight: 800 }}>
                            Downloads
                        </Typography>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography sx={{
                            wordBreak: 'break-word',
                            cursor: 'pointer',
                        }}
                        >
                            {dataset.downloads}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper
                sx={{
                    width: 'fit-content',
                    minWidth: '180px',
                    mt: 2,
                    marginRight: 'auto',
                    marginBottom: 0,
                    marginLeft: 'auto',
                    p: 1,
                }}
            >
                {dataset.tags.map((tag, idx) => (
                    <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ m: 0.25 }}
                    />
                ))}
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
