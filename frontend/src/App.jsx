import { useState } from 'react'
import './App.css'
import Header from './components/common/Header'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Groups from './pages/Groups'
import SingleGroup from './pages/SingleGroup'
import SingleMovie from './pages/SingleMovie'
import Reviews from './pages/Reviews'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <div id="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/groups" exact element={<Groups />} />
          <Route path="/group/:groupId" element={<SingleGroup />} />
          <Route path="/movie/:movieId" element={<SingleMovie />} />
          <Route path="/reviews" exact element={<Reviews />} />
          <Route path="/*" exact element={<NotFound />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
