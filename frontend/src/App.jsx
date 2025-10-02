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
import MovieCollection from './pages/MovieCollection';

import MyAccount from './pages/myprofile/MyAccount.jsx'
import MyFavourites from './pages/myprofile/MyFavourites.jsx'
import MyReviews from './pages/myprofile/MyReviews.jsx'

import PublicFavourites from './pages/PublicFavourites.jsx'

import { Routes, Route } from 'react-router-dom'
import MovieDiscovery from './pages/MovieDiscovery.jsx'
import MyGroups from './pages/myprofile/MyGroups.jsx'





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
          <Route path="/movies" exact element={<MovieDiscovery />} />
          <Route path="/movies/:movieId" element={<SingleMovie />} />
          <Route path="/reviews" exact element={<Reviews />} />
          <Route path="/search" exact element={<MovieSearch />} />
          <Route path="/collection/:collectionId" element={<MovieCollection />} />

          <Route path="/myaccount" exact element={<MyAccount />} />
          <Route path="/myaccount/myfavourites" exact element={<MyFavourites />} />
          <Route path='/myaccount/myreviews' exact element={<MyReviews />} />
          <Route path='/myaccount/mygroups' exact element={<MyGroups />} />

          <Route path='/favourites/:accountId' exact element={<PublicFavourites />} />

          <Route path="/*" exact element={<NotFound />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
