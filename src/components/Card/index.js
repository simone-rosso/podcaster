import { Link } from 'react-router-dom'

import './styles.css'

export const Card = ({ podcast }) => {

    return (
        <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>
            <div className='card__container'>
                <div className='card__image_container'>
                    <img
                        src={podcast['im:image'][2].label}
                        alt={`Cover of ${podcast['im:name']['label']}`}
                        className='card__image_content'
                    />
                </div>
                <div className='card__content'>
                    <span className='card__title'>{podcast['im:name']['label']}</span> <br />
                    <span>Author: {podcast['im:artist']['label']}</span>
                </div>
            </div>
        </Link>
    )
}