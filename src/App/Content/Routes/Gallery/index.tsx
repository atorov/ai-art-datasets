import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import RefreshIcon from '@material-ui/icons/Refresh'
import SearchIcon from '@material-ui/icons/Search'

import useGalleryItems from '../../../../lib/hooks/use-gallery-items'
import useDebounce from '../../../../lib/hooks/use-debounce'

import appInitState from '../../../app-context/init-state'
import { useAppContext } from '../../../app-context/Provider'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },

    search: {
        display: 'flex',
        maxWidth: 1000,
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginRight: 'auto',
        marginBottom: theme.spacing(1),
        marginLeft: 'auto',
    },
    searchInput: {
        flex: 1,
        marginLeft: theme.spacing(1),
    },
    searchButton: {
        padding: 10,
    },

    filters: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: theme.spacing(1),
    },
    formSelect: {
        display: 'flex',
        margin: theme.spacing(1),
        minWidth: 340,
        maxWidth: 480,
    },

    filters__actions: {
        marginBottom: theme.spacing(1),
        textAlign: 'center',
    },

    cards: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card__link: {
        flex: 1,
        minWidth: 340,
        maxWidth: 340,
        margin: theme.spacing(1),
        textDecoration: 'none',
    },
    card: {
        height: '100%',
    },
    card__media: {
        height: 180,
    },
}))

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

    const classes: any = useStyles()

    return (
        <Container className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                Generative design artworks
            </Typography>

            <Paper component="form" className={classes.search}>
                <IconButton
                    type="button"
                    aria-label="clear"
                    className={classes.searchButton}
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
                    {debSearchTermStatus === ':READY:' ? <ClearIcon /> : <HourglassEmptyIcon />}
                </IconButton>
                <InputBase
                    value={searchTerm}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    className={classes.searchInput}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <IconButton
                    type="submit"
                    aria-label="search"
                    className={classes.searchButton}
                    onClick={(event) => event.preventDefault()}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>

            <Box className={classes.filters}>
                <FormControl className={classes.formSelect}>
                    <InputLabel id="authors-multiple-label">
                        Authors
                    </InputLabel>
                    <Select
                        id="authors-multiple"
                        labelId="authors-multiple-label"
                        value={appState.gallery.sfs.selectedAuthors}
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
                <FormControl className={classes.formSelect}>
                    <InputLabel id="sort-by-date-label">
                        Sort by date
                    </InputLabel>
                    <Select
                        id="sort-by-date"
                        labelId="sort-by-date-label"
                        value={appState.gallery.sfs.order}
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

            <Box className={classes.filters__actions}>
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

            <Box className={classes.cards}>
                {items.map(({
                    id, url, description, name,
                }) => (
                    <Link key={id} to={'gallery/' + id} className={classes.card__link}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.card__media}
                                    image={url}
                                    title={name}
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
