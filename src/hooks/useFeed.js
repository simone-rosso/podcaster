import { useState, useEffect } from "react"

import { hasPassedOneDay } from 'helpers'

export const useFeed = ({
    url, element,
}) => {

    const [data, setData] = useState()

    useEffect(() => {
        const daySinceLastVisit = window.localStorage.getItem(`podcaster__${element}__last_visit`)

        async function getPodcastsFromAPI() {
            let data
            try {
                const response = await fetch(url)
                data = await response.json()
            } catch (e) { console.error(e) }

            setData(data)
            window.localStorage.setItem(`podcaster__${element}__data`, JSON.stringify(data))
            window.localStorage.setItem(`podcaster__${element}__last_visit`, new Date())
        }

        function getPodcastsFromLocalStorage() {
            setData(JSON.parse(window.localStorage.getItem(`podcaster__${element}__data`)))
        }

        (!!daySinceLastVisit || !hasPassedOneDay(daySinceLastVisit))
            ? getPodcastsFromLocalStorage()
            : getPodcastsFromAPI()

    }, [])

    return { data }
}