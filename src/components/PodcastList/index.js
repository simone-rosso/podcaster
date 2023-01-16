import { useState } from "react"

import { Card } from '../Card'

import './styles.css'

export const PodcastList = ({ podcasts }) => {

    const [filterValue, setFilterValue] = useState('')

    const podcastsList = podcasts.reduce((list, podcast, index) => {
        if ((podcast['im:artist']['label'].toLowerCase()).includes(filterValue.toLowerCase())
            || (podcast['im:name']['label'].toLowerCase()).includes(filterValue.toLowerCase())) {
            list.push(<Card key={index} podcast={podcast}></Card>)
        }
        return list
    }, [])

    return (
        <>
            <div className="homepage__container_searchbar">
                <input type='text' value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder='Filter podcasts...' />
            </div>
            <>
                {!podcastsList.length && !!filterValue
                    ? <div className="homepage__empty_container">
                        No podcast found
                    </div>
                    : <div className="homepage__container_content">
                        {podcastsList}
                    </div>}
            </>
        </>
    )
}