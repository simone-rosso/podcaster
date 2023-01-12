import { useEffect, useState } from 'react'

import { PodcastList } from '../../components'

import './style.css'

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24
const DEFAULT_FEED = { feed: { entry: [] } }

function hasPassedOneDay(day1) {
    return (new Date().getTime() - new Date(day1).getTime()) > MILLISECONDS_IN_DAY
}

export const Homepage = () => {

    const [feed, setFeed] = useState(DEFAULT_FEED)

    useEffect(() => {
        const daySinceLastVisit = window.localStorage.getItem('podcaster__last_visit')

        async function getPodcastsFromAPI() {
            let data
            try {
                const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
                data = await response.json()
            } catch (e) { console.error(e) }

            setFeed(data)
            window.localStorage.setItem('podcaster__feed', JSON.stringify(data))
            window.localStorage.setItem('podcaster__last_visit', new Date())
            console.log('from api')
        }

        function getPodcastsFromLocalStorage() {
            setFeed(JSON.parse(window.localStorage.getItem('podcaster__feed')))
            console.log('from ls')
        }

        (!!daySinceLastVisit || !hasPassedOneDay(daySinceLastVisit))
            ? getPodcastsFromLocalStorage()
            : getPodcastsFromAPI()

    }, [])

    return (
        <div className="homepage__container">
            <PodcastList podcasts={feed.feed.entry} />
        </div >
    )
}