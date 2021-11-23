import * as React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useDatasets from '../../../../../lib/hooks/use-datasets'

const DatasetDownload = () => {
    const { datasetId } = useParams()
    const items = useDatasets()
    const datasetIndex = items.findIndex((item) => item.id === datasetId)
    const dataset = items[datasetIndex]

    React.useEffect(() => {
        if (dataset) {
            window.open(dataset.url)
        }
    }, [dataset])

    return <Navigate to={{ pathname: `/datasets/${datasetId}` }} />
}

export default DatasetDownload
