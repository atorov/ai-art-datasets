import * as React from 'react'

import type { TGalleryItem } from '../../../types/TGalleryItem'

import { useAppContext } from '../../../App/app-context/Provider'

import GalleryItemsWorker from '../../../workers/gallery-items/gallery-items.worker'

function useGalleryItems() {
    const galleryItemsWorker: React.MutableRefObject<typeof GalleryItemsWorker> = React.useRef()
    const [{ gallery: { data: allItems, sfs } }] = useAppContext()
    const [resolvedItems, setResolvedItems] = React.useState(() => allItems)

    React.useEffect(() => {
        galleryItemsWorker.current = new GalleryItemsWorker()
        galleryItemsWorker.current.addEventListener(
            'message',
            (res: { data: { items: TGalleryItem[], isMostRecent: boolean } }) => {
                const { items, isMostRecent } = res.data
                if (isMostRecent) {
                    setResolvedItems(items)
                }
            },
        )

        return () => {
            galleryItemsWorker.current.terminate()
            galleryItemsWorker.current = undefined
        }
    }, [])

    React.useEffect(() => {
        const data = { allItems, sfs, ts: Date.now() }
        galleryItemsWorker.current.postMessage(data)
    }, [allItems, sfs])

    return resolvedItems
}

export default useGalleryItems
