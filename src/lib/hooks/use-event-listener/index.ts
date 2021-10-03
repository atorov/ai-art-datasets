import { MutableRefObject, useEffect, useRef } from 'react'

function useEventListener(
    eventName: string,
    handler: Function,
    element: Element | typeof globalThis = window,
) {
    const savedHandler: MutableRefObject<Function> = useRef(() => {})

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        function handleEvent(event: any) {
            savedHandler.current(event)
        }

        if (element?.addEventListener) {
            element.addEventListener(eventName, handleEvent)

            return () => element.removeEventListener(eventName, handleEvent)
        }

        return () => {}
    }, [element, eventName])
}

export default useEventListener
