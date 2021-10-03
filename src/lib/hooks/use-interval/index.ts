import { MutableRefObject, useEffect, useRef } from 'react'

function useInterval(callback: Function, delay: number) {
    const savedCallbackRef: MutableRefObject<Function> = useRef(() => {})

    // Remember the latest callback
    useEffect(() => {
        savedCallbackRef.current = callback
    }, [callback])

    // Set up the interval
    useEffect(() => {
        let intervalID: any
        if (delay !== null) {
            intervalID = setInterval(() => savedCallbackRef.current(), delay)
        }

        return () => clearInterval(intervalID)
    }, [delay])
}

export default useInterval
