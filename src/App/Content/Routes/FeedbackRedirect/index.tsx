import { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import delay from '../../../../lib/utils/delay'

function FeedbackRedirect() {
    const history = useHistory()

    useEffect(() => {
        (async () => {
            await delay(550)
            history.push('/')
            await delay(250)
            window.open('https://www.instagram.com/confusion.circles/')
        })()
    }, [history])

    return null
}

export default FeedbackRedirect
