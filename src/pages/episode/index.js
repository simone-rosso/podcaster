import { useParams } from 'react-router-dom'

export const Episode = () => {
    const { episodeId } = useParams

    return (
        <p>episode: {episodeId}</p>
    )
}