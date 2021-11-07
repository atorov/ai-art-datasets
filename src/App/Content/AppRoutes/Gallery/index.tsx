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
import useGalleryItems from '../../../../lib/hooks/use-gallery-items'
import useDebounce from '../../../../lib/hooks/use-debounce'
import appInitState from '../../../app-context/init-state'
import { useAppContext } from '../../../app-context/Provider'

function Gallery() {
    const [appState, appDispatch] = useAppContext()

    const [searchTerm, setSearchTerm] = useState('')
    const [debSearchTermStatus, debSearchTerm] = useDebounce(searchTerm, { delay: searchTerm !== '' ? 1250 : 0 })
    useEffect(() => {
        if (appState.gallery.sfs.searchTerm !== debSearchTerm) {
            appDispatch({
                type: ':appState/gallery/PATCH:',
                payload: {
                    sfs: {
                        ...appInitState.datasets.sfs,
                        searchTerm: debSearchTerm,
                    },
                },
            })
        }
    }, [appDispatch, appState.gallery.sfs, debSearchTerm])

    const allItems = appState.gallery.data
    const authors = Array.from(new Set(allItems.reduce((acc: string[], item) => [...acc, ...item.authors], [])))

    const items = useGalleryItems()

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Generative design artworks
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
                    sx={{ p: '10px' }}
                    onClick={() => {
                        setSearchTerm('')
                        appDispatch({
                            type: ':appState/gallery/PATCH:',
                            payload: {
                                sfs: appInitState.gallery.sfs,
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
                    sx={{ p: '10px' }}
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
                    <InputLabel id="authors-multiple-label">
                        Authors
                    </InputLabel>
                    <Select
                        id="authors-multiple"
                        labelId="authors-multiple-label"
                        value={appState.gallery.sfs.selectedAuthors}
                        label="Authors"
                        multiple
                        onChange={(event) => appDispatch({
                            type: ':appState/gallery/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.gallery.sfs,
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
                    <InputLabel id="sort-by-date-label">
                        Sort by date
                    </InputLabel>
                    <Select
                        id="sort-by-date"
                        labelId="sort-by-date-label"
                        value={appState.gallery.sfs.order}
                        label="Sort by date"
                        onChange={(event) => appDispatch({
                            type: ':appState/gallery/PATCH:',
                            payload: {
                                sfs: {
                                    ...appState.gallery.sfs,
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
                        <MenuItem value=":VIEWS_DESC:">
                            Popularity
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box
                sx={{
                    mb: 1,
                    textAlign: 'center',
                }}
            >
                <Button
                    startIcon={<RefreshIcon />}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                        setSearchTerm('')
                        appDispatch({
                            type: ':appState/gallery/PATCH:',
                            payload: {
                                sfs: appInitState.gallery.sfs,
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
                    id, url, description, name,
                }) => (
                    <Link
                        key={id}
                        to={'/gallery/' + id}
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
                                    image={url}
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

export default Gallery
