import { useParams, Link } from 'react-router-dom'
import { PodcastDetails } from 'components';
import { usePodcast } from 'hooks'

import './styles.css'

export const Podcast = () => {
    let { podcastId } = useParams();
    const { podcast } = usePodcast()

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
                                    <p>{podcast.details.description ?? '**description not found'}</p>
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
