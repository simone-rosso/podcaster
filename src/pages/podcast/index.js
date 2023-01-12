import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PodcastDetails } from '../../components';

export const Podcast = () => {
    let { podcastId } = useParams();
    const [podcast, setPodcast] = useState()


    const iTunesUrlForEpisodes = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=10`
    const iTunesUrlForPodcastDetails = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast`

    useEffect(() => {

        Promise.all([
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(iTunesUrlForPodcastDetails)}`),
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(iTunesUrlForEpisodes)}`)
        ])
            .then(([resDetails, resEpisodes]) =>
                Promise.all([resDetails.json(), resEpisodes.json()])
            )
            .then(([dataDetails, dataEpisodes]) => {
                setPodcast({
                    details: JSON.parse(dataDetails.contents).results[0],
                    episodes: JSON.parse(dataEpisodes.contents).results
                })
            }
            )

    }, [podcastId])

    return (
        <div className='podcast__container'>
            {podcast ? <>
                <div className='podcast__info_card'>
                    <div className='podcast__info_card__image'>
                        <img src={podcast.details.artworkUrl100} />
                    </div>
                    <div className='podcast__info_card__content'>
                        <span>{podcast.details.trackName}</span><br/>
                        <span>by {podcast.details.artistName}</span><br/>
                        <span>Description:</span><br/>
                        <span></span>
                    </div>
                </div>
                <PodcastDetails podcast={podcast} />
            </> : <p>Loading</p>}
        </div>
    )
}
