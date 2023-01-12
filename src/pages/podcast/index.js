import { useParams } from 'react-router-dom'

export const Podcast = () => {
    let { podcastId } = useParams();
    return (
        <p>podcast: {podcastId}</p>
    )
}