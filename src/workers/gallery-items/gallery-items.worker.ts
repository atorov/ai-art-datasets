// https://github.com/webpack-contrib/worker-loader/issues/139
// https://github.com/nishio/tutorial-webworker-with-react/blob/master/README.md

import type { TAppState } from '../../App/app-context/types'

type TEventData = {
    allItems: TAppState['gallery']['data']
    sfs: TAppState['gallery']['sfs']
}

let id: number = 0

onmessage = (event: { data: TEventData }) => {
    const {
        allItems,
        sfs: {
            order,
            searchTerm,
            selectedAuthors,
        },
    } = event.data

    const ts = Date.now()
    id = ts

    let items = allItems
        // Search
        .filter((item) => (
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
                || item.description.toLowerCase().includes(searchTerm.toLowerCase())
        ))
        // Filter
        .filter((item) => (
            !selectedAuthors.length
                || item.authors.reduce((acc: Boolean, author) => (acc || selectedAuthors.includes(author)), false)
        ))

    // Sort
    if (order === ':VIEWS_DESC:') {
        items.sort((a, b) => {
            if (a.views < b.views) return 1
            if (a.views > b.views) return -1
            return 0
        })
    }
    else {
        items.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1
            if (a.createdAt > b.createdAt) return 1
            return 0
        })

        items = order === ':NEWEST_FIRST:' ? [...items].reverse() : items
    }

    // @ts-ignore
    postMessage({ items, isMostRecent: ts === id })
}

export default null as any
