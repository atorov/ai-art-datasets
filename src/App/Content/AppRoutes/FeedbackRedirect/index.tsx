import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import delay from '../../../../lib/utils/delay'

function FeedbackRedirect() {
    const navigate = useNavigate()

    useEffect(() => {
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
