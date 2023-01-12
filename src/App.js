import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import { Episode, Homepage, Podcast } from './pages'

import './App.css'

const Error404 = () => <h1>Error 404 - Page not found</h1>

const App = () => {

    return (
        <div id="app-container">
            <BrowserRouter>
                <header>
                    <Link to='/'>
                        <h1 id='title'>Podcaster</h1>
                    </Link>
                </header>

                <section>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/podcast/:podcastId' element={<Podcast />} />
                        <Route path='/podcast/:podcastId/episode/:episodeId' element={<Episode />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </section>


            </BrowserRouter>
        </div >
    )
}


export default App