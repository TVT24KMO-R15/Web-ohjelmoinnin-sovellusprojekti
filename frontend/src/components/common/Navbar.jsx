import React, { useState } from 'react'
import './Navbar.css'
import Signin from './Signin';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function Navbar() {
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>);
  const menuIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>);
        
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sivuvalikko, joka on käytössä vain kapeille näytöille
  const [signinOpen, setSigninOpen] = useState(false); // Kirjautumisikkuna

  return (
    <>
    {/* Sivuvalikko */}
      <nav>
        <ul className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <li onClick={() => setSidebarOpen(false)}><Link to="#">
            {closeIcon}
          </Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li className="Sign_in" onClick={() => setSigninOpen(true)}>Sign in</li>
        </ul>
        <ul>
          {/* Normaali valikko */}
          <li><Link to="/">Home</Link></li>
          <li className="btn hideOnMobile"><Link to="/movies">Movies</Link></li>
          <li className="btn hideOnMobile"><Link to="/groups">Groups</Link></li>
          <li className="btn hideOnMobile"><Link to="/reviews">Reviews</Link></li>
          <li className="menu-btn" onClick={() => setSidebarOpen(true)}>
            {menuIcon}
          </li>
          {/* Venyvä hakupainike */}
              <SearchBar searchDestination={'/search'}/>

          {/* Sisäänkirjautumisnappi */}
          <button className="signin-btn"
            onClick={() => setSigninOpen(true)}>
            Sign in
          </button>
          </ul>
          </nav>
      
          {/* Näytä modal vain jos signinOpen === true */}
          {signinOpen && <Signin onClose={() => setSigninOpen(false)} />}

   

    </>
  )
}

