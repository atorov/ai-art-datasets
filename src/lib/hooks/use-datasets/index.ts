import { useAppContext } from '../../../App/app-context/Provider'

function useDatasets() {
    const [{
        datasets: {
            data: allItems,
            sfs: {
                minItemsNumber,
                minItemsResolution,
                order,
                searchTerm,
                selectedAuthors,
                selectedImageFormats,
                selectedLicenses,
            },
        },
    }] = useAppContext()

    const items = allItems
        // Search
        .filter((item) => (
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
            || item.description.toLowerCase().includes(searchTerm.toLowerCase())
            || item.tags.join(';;').toLowerCase().includes(searchTerm.toLowerCase())
        ))
        // Filter
        .filter((item) => item.itemsNumber >= minItemsNumber)
        .filter((item) => (
            item.resolution.width >= minItemsResolution
            || item.resolution.height >= minItemsResolution
        ))
        .filter((item) => (
            !selectedAuthors.length
            || item.authors.reduce((acc: Boolean, author) => (acc || selectedAuthors.includes(author)), false)
        ))
        .filter((item) => (
            !selectedImageFormats.length
            || selectedImageFormats.includes(item.imageFormat)
        ))
        .filter((item) => (
            !selectedLicenses.length
            || selectedLicenses.includes(item.license)
        ))

    // Sort
    if (order === ':DOWNLOADS_DESC:') {
        items.sort((a, b) => {
            if (a.downloads < b.downloads) return 1
            if (a.downloads > b.downloads) return -1
            return 0
        })

        return items
    }

    items.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return -1
        if (a.updatedAt > b.updatedAt) return 1
        return 0
    })

    return order === ':NEWEST_FIRST:' ? [...items].reverse() : items
}

export default useDatasets
