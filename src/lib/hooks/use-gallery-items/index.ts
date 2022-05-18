import * as React from 'react'

import type { TGalleryItem } from '../../../types/TGalleryItem'

import { useAppContext } from '../../../App/app-context/Provider'

import GalleryItemsWorker from '../../../workers/gallery-items/gallery-items.worker'

function useGalleryItems() {
    const galleryItemsWorker: React.MutableRefObject<typeof GalleryItemsWorker> = React.useRef()
    const [{ gallery: { data: allItems, sfs } }] = useAppContext()
    const [resolvedItems, setResolvedItems] = React.useState(() => allItems)

    React.useEffect(() => {
        if (!galleryItemsWorker.current) {
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
        }

        const data = { allItems, sfs, ts: Date.now() }
        galleryItemsWorker.current.postMessage(data)

        return () => {
            galleryItemsWorker.current.terminate()
            galleryItemsWorker.current = undefined
        }
    }, [allItems, sfs])

    return resolvedItems
}

export default useGalleryItems
