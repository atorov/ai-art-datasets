import * as React from 'react'

function useInterval(callback: Function, delay: number) {
    const savedCallbackRef: React.MutableRefObject<Function> = React.useRef(() => {})

    // Remember the latest callback
    React.useEffect(() => {
        savedCallbackRef.current = callback
    }, [callback])

    // Set up the interval
    React.useEffect(() => {
        let intervalID: ReturnType<typeof setInterval>
        if (delay !== null) {
            intervalID = setInterval(() => savedCallbackRef.current(), delay)
        }

        return () => clearInterval(intervalID)
    }, [delay])
}

export default useInterval
