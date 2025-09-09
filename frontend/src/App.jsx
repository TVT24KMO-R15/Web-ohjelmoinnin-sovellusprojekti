import { useState } from 'react'
import './App.css'
import Header from './components/common/Header'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Groups from './pages/Groups'
import Group from './pages/SingleGroup'
import Reviews from './pages/Reviews'

import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Navbar />
      <div id="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/groups" exact element={<Groups />} />
          <Route path="/group/:groupId" element={<Group />} />
          <Route path="/reviews" exact element={<Reviews />} />
          <Route path="/*" exact element={<NotFound />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
