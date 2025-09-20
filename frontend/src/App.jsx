import { useState } from 'react'
import './App.css'
import './global.css'
import Header from './components/common/Header'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Groups from './pages/Groups'
import SingleGroup from './pages/SingleGroup'
import Movies from './pages/Movies'
import SingleMovie from './pages/SingleMovie'
import Reviews from './pages/Reviews'
import MovieSearch from './pages/MovieSearch.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      
      <Navbar />
      <Header />
      <div id="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/groups" exact element={<Groups />} />
          <Route path="/groups/:groupId" element={<SingleGroup />} />
          <Route path="/movies" exact element={<Movies />} />
          <Route path="/movies/:movieId" element={<SingleMovie />} />
          <Route path="/reviews" exact element={<Reviews />} />
          <Route path="/search" exact element={<MovieSearch />} />
          <Route path="/*" exact element={<NotFound />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
