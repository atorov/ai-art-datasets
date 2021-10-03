import { useEffect } from 'react'

import { Redirect, useParams } from 'react-router-dom'

import useDatasets from '../../../../../lib/hooks/use-datasets'

function DatasetDownload() {
    const { datasetId }: any = useParams()

    const items = useDatasets()
    const datasetIndex = items.findIndex((item) => item.id === datasetId)
    const dataset = items[datasetIndex]

    useEffect(() => {
        if (dataset) {
            window.open(dataset.url)
        }
    }, [dataset])

    return <Redirect to={{ pathname: `/datasets/${datasetId}` }} />
}

export default DatasetDownload
