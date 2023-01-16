import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PodcastDetails } from 'components';

import './styles.css'

export const Podcast = () => {
    let { podcastId } = useParams();
    const [podcast, setPodcast] = useState()


    const iTunesUrlForEpisodes = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
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
        <>
            {podcast
                ? <div className='podcast__container'>
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
                                        <h4 className='podcast__info_card__'>{podcast.details.trackName}</h4>
                                    </Link>
                                    <Link to={`/podcast/${podcastId}`}>
                                        <p>by {podcast.details.artistName}</p>
                                    </Link>
                                </div>
                                <div className='podcast__info_card__content_description'>
                                    <h5>Description:</h5>
                                    <p>**description not found</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <PodcastDetails podcast={podcast} />
                </div>
                : <div className='podcast__loading__container'>
                    <div className="podcast__spinner">
                        <span>L</span>
                        <span>O</span>
                        <span>A</span>
                        <span>D</span>
                        <span>I</span>
                        <span>N</span>
                        <span>G</span>
                    </div>
                </div>}
        </>
    )
}
