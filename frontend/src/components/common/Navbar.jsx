import React, { useState } from 'react'
import './Navbar.css'
import Authentication from './Authentication';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import {useUser} from '../../context/UseUser';

export default function Navbar() {
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>);
  const menuIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>);
        
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sivuvalikko, joka on käytössä vain kapeille näytöille
  const [signinOpen, setSigninOpen] = useState(false); // Kirjautumisikkuna
  const { user } = useUser();

  /* Sulje kirjautuminen kun on vastaanotettu user token */
  React.useEffect(() => {
    if (user && user.token) {
      setSigninOpen(false);
    }
  }, [user]);
  return (
    <>
    {/* Sivuvalikko */}
      <nav>
        <ul className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <li onClick={() => setSidebarOpen(false)}><article className='sidebarButton'>
        {closeIcon}
        </article></li>
          <li><Link to="/search">Movies</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          { user && user.token ? (
            <li><Link to="#">Sign out</Link></li>
          ) : ''}
          
          { !user || !user.token ? (
            <li onClick={() => setSigninOpen(true)}><Link to="">Sign in</Link></li>
          ) : '' }
        </ul>
        <ul>
          {/* Normaali valikko */}
          <li><Link to="/">Home</Link></li>
          <li className="btn hideOnMobile"><Link to="/search">Movies</Link></li>
          <li className="btn hideOnMobile"><Link to="/groups">Groups</Link></li>
          <li className="btn hideOnMobile"><Link to="/reviews">Reviews</Link></li>
          <li className="menu-btn" onClick={() => setSidebarOpen(true)}>
            {menuIcon}
          </li>
          {/* Venyvä hakupainike */}
              <SearchBar searchDestination={'/search'}/>

        {/* Sisäänkirjautumisnappi */}
        { !user || !user.token ? (
          <button className="signin-btn" onClick={() => setSigninOpen(true)}>
            Sign in
          </button>
          
        ) : (
          <>
          {/* Käyttäjänappi */}
            <button className="signin-btn" onClick={() => setSidebarOpen(true)}>
              Account
            </button>
          </>
        )}
          </ul>
          </nav>
      
          {/* Näytä modal vain jos signinOpen === true */}
        {signinOpen && <Authentication onClose={() => setSigninOpen(false)} />}

        

    </>
  )
}

