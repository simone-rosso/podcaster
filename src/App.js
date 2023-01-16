import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Homepage, Podcast } from './pages'

import './App.css'

const Error404 = () => <h1>Error 404 - Page not found</h1>
const Loader = () => <div className="header__loader"><div></div><div></div><div></div></div>

const App = () => {
    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransistionStage] = useState("fadeIn")

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut")
    }, [location, displayLocation])

    return (
        <div id="app-container">
            <header>
                <Link to='/'>
                    <h1 id='title'>Podcaster</h1>
                </Link>
                {
                    transitionStage === 'fadeOut' ? <Loader /> : null
                }
            </header>

            <section
                className={`${transitionStage}`}
                onAnimationEnd={() => {
                    if (transitionStage === "fadeOut") {
                        setTransistionStage("fadeIn");
                        setDisplayLocation(location);
                    }
                }}
            >
                <Routes location={displayLocation}>
                    <Route exact path='/' element={<Homepage />} />
                    <Route path='/podcast/:podcastId' element={<Podcast />} />
                    <Route path='/podcast/:podcastId/episode/:episodeId' element={<Podcast />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </section>
        </div >
    )
}


export default App