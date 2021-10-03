import {
    MutableRefObject, useEffect, useRef, useState,
} from 'react'

import type { TGalleryItem } from '../../../types/TGalleryItem'

import { useAppContext } from '../../../App/app-context/Provider'

import GalleryItemsWorker from '../../../workers/gallery-items/gallery-items.worker'

function useGalleryItems() {
    const galleryItemsWorker: MutableRefObject<any> = useRef()

    const [{ gallery: { data: allItems, sfs } }] = useAppContext()

    const [resolvedItems, setResolvedItems] = useState(() => allItems)

    useEffect(() => {
        galleryItemsWorker.current = new GalleryItemsWorker()
        galleryItemsWorker.current.addEventListener(
            'message',
            (res: any) => {
                const { items, isMostRecent } = res.data as { items: TGalleryItem[], isMostRecent: boolean }
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

    useEffect(() => {
        const data = { allItems, sfs, ts: Date.now() }
        galleryItemsWorker.current.postMessage(data)
    }, [allItems, sfs])

    return resolvedItems
}

export default useGalleryItems
