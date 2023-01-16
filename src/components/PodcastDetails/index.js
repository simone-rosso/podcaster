import { useParams, Link } from 'react-router-dom'

import './styles.css'

export const PodcastDetails = ({ podcast }) => {
    let { podcastId, episodeId } = useParams();

    const EpisodesList = () => {
        return (
            <div className='episodes_list__container'>
                <div className='episodes_list__counter'>Episodes: {podcast.details.trackCount}</div>
                <div className='episodes_list__table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                podcast.episodes.map((episode, index) => {
                                    return (
                                        <tr key={index}>
                                            <th><Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>{episode.trackName} </Link> </th>
                                            <th>{(new Date(episode.releaseDate).toISOString().split('T')[0]).replaceAll('-', '/')}</th>
                                            <th>{new Date(episode.trackTimeMillis * 1000).toISOString().slice(11, -5)}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const EpisodeDetails = () => {
        const selectedEpisode = podcast.episodes.find((episode) => episode.trackId == episodeId)
        console.log(selectedEpisode)
        return (
            <div className='episode_details__container'>
                <h4 className='episode_details__title'>{selectedEpisode.trackName}</h4>
                <div className='episode_details__content'>
                    <p>{selectedEpisode.description}</p>
                </div>
                <div className='episode_details__audio__container'>
                    <audio controls preload="metadata" src={selectedEpisode.episodeUrl} >
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                episodeId
                    ? <EpisodeDetails />
                    : <EpisodesList />
            }
        </div>
    )
}