// https://github.com/webpack-contrib/worker-loader/issues/139
// https://github.com/nishio/tutorial-webworker-with-react/blob/master/README.md

import type { TInitState } from '../../App/app-context/init-state'

type TEventData = {
    allItems: TInitState['gallery']['data']
    sfs: TInitState['gallery']['sfs']
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
