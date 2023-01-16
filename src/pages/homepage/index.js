import { PodcastList } from 'components'

import { useData } from 'hooks'

import './styles.css'

export const Homepage = () => {

    const { data } = useData({
        url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        element: 'feed'
    })

    return (
        <div className="homepage__container">
            {data ? <PodcastList podcasts={data.feed.entry} /> : null}
        </div >
    )
}