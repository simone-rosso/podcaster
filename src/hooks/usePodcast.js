import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { hasPassedOneDay } from 'helpers'

export const usePodcast = () => {

    let { podcastId } = useParams();
    const [podcast, setPodcast] = useState()

    const iTunesUrlForEpisodes = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    const iTunesUrlForPodcastDetails = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast`

    useEffect(() => {
        const daySinceLastVisit = window.localStorage.getItem(`podcaster__${podcastId}__last_visit`)

        function getPodcastsFromAPI() {
            Promise.all([
                fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(iTunesUrlForPodcastDetails)}`),
                fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(iTunesUrlForEpisodes)}`)
            ])
                .then(([resDetails, resEpisodes]) =>
                    Promise.all([resDetails.json(), resEpisodes.json()])
                )
                .then(([dataDetails, dataEpisodes]) => {
                    const data = {
                        details: JSON.parse(dataDetails.contents).results[0],
                        episodes: JSON.parse(dataEpisodes.contents).results
                    }
                    setPodcast(data)
                    console.log('from api')
                    window.localStorage.setItem(`podcaster__${podcastId}__data`, JSON.stringify(data))
                    window.localStorage.setItem(`podcaster__${podcastId}__last_visit`, new Date())
                })
        }

        function getPodcastsFromLocalStorage() {
            console.log('from ls')
            setPodcast(JSON.parse(window.localStorage.getItem(`podcaster__${podcastId}__data`)))
        }

        (!!daySinceLastVisit || !hasPassedOneDay(daySinceLastVisit))
            ? getPodcastsFromLocalStorage()
            : getPodcastsFromAPI()

    }, [podcastId])

    return { podcast }
}