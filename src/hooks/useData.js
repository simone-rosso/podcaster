import { useState, useEffect } from "react"


const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

function hasPassedOneDay(day1) {
    return (new Date().getTime() - new Date(day1).getTime()) > ONE_DAY_IN_MILLISECONDS
}

export const useData = ({
    url, element,
}) => {

    const [data, setData] = useState()

    useEffect(() => {
        const daySinceLastVisit = window.localStorage.getItem(`${element}__last_visit`)

        async function getPodcastsFromAPI() {
            let data
            try {
                const response = await fetch(url)
                data = await response.json()
            } catch (e) { console.error(e) }

            setData(data)
            window.localStorage.setItem(`${element}__data`, JSON.stringify(data))
            window.localStorage.setItem(`${element}__last_visit`, new Date())
        }

        function getPodcastsFromLocalStorage() {
            setData(JSON.parse(window.localStorage.getItem(`${element}__data`)))
        }

        (!!daySinceLastVisit || !hasPassedOneDay(daySinceLastVisit))
            ? getPodcastsFromLocalStorage()
            : getPodcastsFromAPI()

    }, [])

    return { data }
}