import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PodcastDetails } from '../../components';

import './styles.css'

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
            {/*     {podcast ? <>
                <div className='podcast__info_container'>
                    <div className='podcast__info_card'>
                        <div className='podcast__info_card__image'>
                            <Link to={`/podcast/${podcastId}`}>
                                <img src={podcast.details.artworkUrl100} />
                            </Link>
                        </div>
                        <div className='podcast__info_card__content'>
                            <div className='podcast__info_card__content_title' >
                                <Link to={`/podcast/${podcastId}`}>
                                    <span>{podcast.details.trackName}</span><br />
                                </Link>
                                <Link to={`/podcast/${podcastId}`}>
                                    <span>by {podcast.details.artistName}</span><br />
                                </Link>
                            </div>
                            <div className='podcast__info_card__content_description'>
                                <span>Description:</span><br />
                                <span>**description not found</span>
                            </div>

                        </div>
                    </div>
                </div>

                <PodcastDetails podcast={podcast} />
            </> : */} <div className='podcast__loading'>
                {/* <p>Loading</p> */}
                <div class="lds-ripple"><div></div><div></div></div>
            </div>{/* } */}
        </div>
    )
}
