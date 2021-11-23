import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import delay from '../../../../lib/utils/delay'

const FeedbackRedirect = () => {
    const navigate = useNavigate()

    React.useEffect(() => {
        (async () => {
            await delay(550)
            navigate('/')
            await delay(250)
            window.open('https://www.instagram.com/confusion.circles/')
        })()
    }, [navigate])

    return null
}

export default FeedbackRedirect
