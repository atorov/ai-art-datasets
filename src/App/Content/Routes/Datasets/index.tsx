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

import useDatasets from '../../../../lib/hooks/use-datasets'
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
    searchButton: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: theme.spacing(1),
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

    const classes: any = useStyles()

    return (
        <Container className={classes.root}>
            <Typography variant="h4" align="center" gutterBottom>
                AI Art Datasets
            </Typography>

            <Paper component="form" className={classes.search}>
                <IconButton
                    type="button"
                    aria-label="clear"
                    className={classes.searchButton}
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
                    <InputLabel id="min-items-number-single-label">
                        Number of items
                    </InputLabel>
                    <Select
                        id="min-items-number-single"
                        labelId="min-items-number-single-label"
                        value={appState.datasets.sfs.minItemsNumber}
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

                <FormControl className={classes.formSelect}>
                    <InputLabel id="min-items-resolution-single-label">
                        Resolution
                    </InputLabel>
                    <Select
                        id="min-items-resolution-single"
                        labelId="min-items-resolution-single-label"
                        value={appState.datasets.sfs.minItemsResolution}
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

                <FormControl className={classes.formSelect}>
                    <InputLabel id="selected-image-format-multiple-label">
                        Image format
                    </InputLabel>
                    <Select
                        id="selected-image-format-multiple"
                        labelId="selected-image-format-multiple-label"
                        value={appState.datasets.sfs.selectedImageFormats}
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

                <FormControl className={classes.formSelect}>
                    <InputLabel id="selected-authors-multiple-label">
                        Authors
                    </InputLabel>
                    <Select
                        id="selected-authors-multiple"
                        labelId="selected-authors-multiple-label"
                        value={appState.datasets.sfs.selectedAuthors}
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

                <FormControl className={classes.formSelect}>
                    <InputLabel id="selected-licenses-multiple-label">
                        Licenses
                    </InputLabel>
                    <Select
                        id="selected-licenses-multiple"
                        labelId="selected-licenses-multiple-label"
                        value={appState.datasets.sfs.selectedLicenses}
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

                <FormControl className={classes.formSelect}>
                    <InputLabel id="sort-by-date-label">
                        Sort by
                    </InputLabel>
                    <Select
                        id="sort-by-date"
                        labelId="sort-by-date-label"
                        value={appState.datasets.sfs.order}
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

            <Box className={classes.filters__actions}>
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

            <Box className={classes.cards}>
                {items.map(({
                    id, description, name, sampleUrls,
                }) => (
                    <Link key={id} to={'datasets/' + id} className={classes.card__link}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.card__media}
                                    image={sampleUrls[0]}
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

export default Datasets
