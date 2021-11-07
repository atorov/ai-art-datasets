import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import useDatasets from '../../../../lib/hooks/use-datasets'
import useDebounce from '../../../../lib/hooks/use-debounce'
import appInitState from '../../../app-context/init-state'
import { useAppContext } from '../../../app-context/Provider'

function Datasets() {
    const [appState, appDispatch] = useAppContext()

    const [searchTerm, setSearchTerm] = useState('')
    const [debSearchTermStatus, debSearchTerm] = useDebounce(searchTerm, { delay: searchTerm !== '' ? 1250 : 0 })
    useEffect(() => {
        if (appState.datasets.sfs.searchTerm !== debSearchTerm) {
            appDispatch({
                type: ':appState/datasets/PATCH:',
                payload: {
                    sfs: {
                        ...appInitState.datasets.sfs,
                        searchTerm: debSearchTerm,
                    },
                },
            })
        }
    }, [appDispatch, appState.datasets.sfs, debSearchTerm])

    const allItems = appState.datasets.data
    const authors = Array.from(new Set(allItems.reduce((acc: string[], item) => [...acc, ...item.authors], [])))
    const imageFormats = Array.from(new Set(allItems.reduce((acc: string[], item) => [...acc, item.imageFormat], [])))
    const licenses = Array.from(new Set(allItems.reduce((acc: string[], item) => [...acc, item.license], [])))

    const items = useDatasets()

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                AI Art Datasets
            </Typography>

            <Paper
                component="form"
                sx={{
                    display: 'flex',
                    maxWidth: '1000px',
                    alignItems: 'center',
                    mt: 1,
                    marginRight: 'auto',
                    mb: 1,
                    marginLeft: 'auto',
                }}
            >
                <IconButton
                    type="button"
                    aria-label="clear"
                    sx={{ padding: '10px' }}
                    onClick={() => {
                        setSearchTerm('')
                        appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: appInitState.datasets.sfs,
                            },
                        })
                    }}
                    size="large"
                >
                    {debSearchTermStatus === ':READY:' ? <ClearIcon /> : <HourglassEmptyIcon />}
                </IconButton>
                <InputBase
                    value={searchTerm}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    sx={{ flex: 1, ml: 1 }}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <IconButton
                    type="submit"
                    aria-label="search"
                    sx={{ padding: '10px' }}
                    onClick={(event) => event.preventDefault()}
                    size="large"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    m: 1,
                }}
            >
                <FormControl
                    sx={{
                        display: 'flex',
                        m: 1,
                        minWidth: '340px',
                        maxWidth: '480px',
                    }}
                >
                    <InputLabel id="min-items-number-single-label">
                        Number of items
                    </InputLabel>
                    <Select
                        id="min-items-number-single"
                        labelId="min-items-number-single-label"
                        value={appState.datasets.sfs.minItemsNumber}
                        label="Number of items"
                        onChange={(event) => appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.datasets.sfs,
                                    minItemsNumber: event.target.value,
                                },
                            },
                        })}
                    >
                        {[
                            { display: 'Any', value: 0 },
                            { display: '500+', value: 500 },
                            { display: '1000+', value: 1000 },
                            { display: '2000+', value: 2000 },
                            { display: '3000+', value: 3000 },
                            { display: '4000+', value: 4000 },
                            { display: '5000+', value: 5000 },
                        ].map(({ display, value }) => (
                            <MenuItem key={display} value={value}>
                                {display}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        display: 'flex',
                        m: 1,
                        minWidth: '340px',
                        maxWidth: '480px',
                    }}
                >
                    <InputLabel id="min-items-resolution-single-label">
                        Resolution
                    </InputLabel>
                    <Select
                        id="min-items-resolution-single"
                        labelId="min-items-resolution-single-label"
                        value={appState.datasets.sfs.minItemsResolution}
                        label="Resolution"
                        onChange={(event) => appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.datasets.sfs,
                                    minItemsResolution: event.target.value,
                                },
                            },
                        })}
                    >
                        {[
                            { display: 'Any', value: 0 },
                            { display: '512+px', value: 512 },
                            { display: '1024+px', value: 1024 },
                            { display: '2048+px', value: 2048 },
                        ].map(({ display, value }) => (
                            <MenuItem key={display} value={value}>
                                {display}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        display: 'flex',
                        m: 1,
                        minWidth: '340px',
                        maxWidth: '480px',
                    }}
                >
                    <InputLabel id="selected-image-format-multiple-label">
                        Image format
                    </InputLabel>
                    <Select
                        id="selected-image-format-multiple"
                        labelId="selected-image-format-multiple-label"
                        value={appState.datasets.sfs.selectedImageFormats}
                        label="Image format"
                        multiple
                        onChange={(event) => appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.datasets.sfs,
                                    selectedImageFormats: event.target.value,
                                },
                            },
                        })}
                    >
                        {imageFormats.map((format) => (
                            <MenuItem key={format} value={format}>
                                {format}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        display: 'flex',
                        m: 1,
                        minWidth: '340px',
                        maxWidth: '480px',
                    }}
                >
                    <InputLabel id="selected-authors-multiple-label">
                        Authors
                    </InputLabel>
                    <Select
                        id="selected-authors-multiple"
                        labelId="selected-authors-multiple-label"
                        value={appState.datasets.sfs.selectedAuthors}
                        label="Authors"
                        multiple
                        onChange={(event) => appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.datasets.sfs,
                                    selectedAuthors: event.target.value,
                                },
                            },
                        })}
                    >
                        {authors.map((author) => (
                            <MenuItem key={author} value={author}>
                                {author}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        display: 'flex',
                        m: 1,
                        minWidth: '340px',
                        maxWidth: '480px',
                    }}
                >
                    <InputLabel id="selected-licenses-multiple-label">
                        Licenses
                    </InputLabel>
                    <Select
                        id="selected-licenses-multiple"
                        labelId="selected-licenses-multiple-label"
                        value={appState.datasets.sfs.selectedLicenses}
                        label="Licenses"
                        multiple
                        onChange={(event) => appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.datasets.sfs,
                                    selectedLicenses: event.target.value,
                                },
                            },
                        })}
                    >
                        {licenses.map((license) => (
                            <MenuItem key={license} value={license}>
                                {license}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        display: 'flex',
                        m: 1,
                        minWidth: '340px',
                        maxWidth: '480px',
                    }}
                >
                    <InputLabel id="sort-by-date-label">
                        Sort by
                    </InputLabel>
                    <Select
                        id="sort-by-date"
                        labelId="sort-by-date-label"
                        value={appState.datasets.sfs.order}
                        label="Sort by"
                        onChange={(event) => appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.datasets.sfs,
                                    order: event.target.value,
                                },
                            },
                        })}
                    >
                        <MenuItem value=":NEWEST_FIRST:">
                            Newest first
                        </MenuItem>
                        <MenuItem value=":OLDEST_FIRST:">
                            Oldest first
                        </MenuItem>
                        <MenuItem value=":DOWNLOADS_DESC:">
                            Popularity
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ mb: 1, textAlign: 'center' }}>
                <Button
                    startIcon={<RefreshIcon />}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                        setSearchTerm('')
                        appDispatch({
                            type: ':appState/datasets/PATCH:',
                            payload: {
                                sfs: appInitState.datasets.sfs,
                            },
                        })
                    }}
                >
                    Reset filters
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {items.map(({
                    id, description, name, sampleUrls,
                }) => (
                    <Link
                        key={id}
                        to={'/datasets/' + id}
                        style={{
                            flex: 1,
                            minWidth: '340px',
                            maxWidth: '340px',
                            margin: '8px',
                            textDecoration: 'none',
                        }}
                    >
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea>
                                <CardMedia
                                    image={sampleUrls[0]}
                                    title={name}
                                    sx={{ height: '180px' }}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                ))}
            </Box>
        </Container>
    )
}

export default Datasets
