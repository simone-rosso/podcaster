import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import { Episode, Homepage, Podcast } from './pages'

const Error404 = () => <h1>Error404</h1>

const App = () => {

    return (
        <div id="app-container">
            <BrowserRouter>
                <header>
                    <h1 id='title'>Podcaster</h1>
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