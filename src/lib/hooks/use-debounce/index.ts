import * as React from 'react'

type TDebouncedValueStatus = '' | ':READY:' | ':PENDING:'

type TOptions = Partial<{
    delay: number
    initStatus: TDebouncedValueStatus
}>

function useDebounce<TValue>(
    value: TValue,
    {
        delay = 550,
        initStatus = '',
    }: TOptions,
): [TDebouncedValueStatus, TValue] {
    const [debouncedValue, setDebouncedValue] = React.useState(value)
    const [debouncedValueStatus, setDebouncedValueStatus] = React.useState(initStatus)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
            setDebouncedValueStatus(':READY:')
        }, delay)

        return () => {
            clearTimeout(handler)
            setDebouncedValueStatus(':PENDING:')
        }
    }, [delay, value])

    return [debouncedValueStatus, debouncedValue]
}

export default useDebounce
