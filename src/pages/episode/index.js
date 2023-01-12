import { useParams } from 'react-router-dom'

export const Episode = () => {
    let { episodeId } = useParams();
 
    return (
        <p>episode: {episodeId}</p>
    )
}