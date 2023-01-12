import { useParams } from 'react-router-dom'

import './styles.css'

export const PodcastDetails = ({ podcast }) => {
    let { podcastId, episodeId } = useParams();

    const EpisodesList = () => {
        return (
            <div className='episodes_list__container'>
                <div></div>
                <div>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Duration</th>
                        </tr>
                        {
                            podcast.episodes.map((episode, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{episode.trackName}</th>
                                        <th>{new Date(episode.releaseDate).toISOString().split('T')[0]}</th>
                                        <th>{new Date(episode.trackTimeMillis * 1000).toISOString().slice(11, -5)}</th>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                episodeId
                    ? <p>{episodeId}</p>
                    : <EpisodesList />
            }
        </div>
    )
}