import { useEffect } from 'react'

import { Navigate, useParams } from 'react-router-dom'

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

    return <Navigate to={{ pathname: `/datasets/${datasetId}` }} />
}

export default DatasetDownload
