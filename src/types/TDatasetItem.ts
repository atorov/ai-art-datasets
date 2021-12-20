export type TDatasetItem = {
    id: string
    name: string
    description: string
    tags: string[]
    itemsNumber: number
    resolution: {
        width: number
        height: number
    }
    imageFormat: string

    authors: string[]
    license: string
    version: string
    createdAt: number
    updatedAt: number

    sampleUrls: string[]
    url: string
    externalUrl: string

    downloads: number
    // rating: number
}
