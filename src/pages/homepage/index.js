import { PodcastList } from 'components'

import { useFeed } from 'hooks'

import './styles.css'

export const Homepage = () => {

    const { data } = useFeed({
        url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        element: 'feed'
    })

    return (
        <div className="homepage__container">
            {data ? <PodcastList podcasts={data.feed.entry} /> : null}
        </div >
    )
}