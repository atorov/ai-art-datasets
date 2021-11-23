import * as React from 'react'

function useEventListener(
    eventName: string,
    handler: Function,
    element: Element | typeof globalThis = window,
) {
    const savedHandler: React.MutableRefObject<Function> = React.useRef(() => {})

    React.useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    React.useEffect(() => {
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
