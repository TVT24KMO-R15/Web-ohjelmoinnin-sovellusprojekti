import React, { useState, useRef, useEffect } from 'react'
import './Navbar.css'
import Authentication from './Authentication';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import {useUser} from '../../context/UseUser';

export default function Navbar() {
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>);
  const menuIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>);
        
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sivuvalikko, joka on käytössä vain kapeille näytöille
  const [signinOpen, setSigninOpen] = useState(false); // Kirjautumisikkuna
  const { user, setUser, signOut } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpenOnMobile, setSearchOpenOnMobile] = useState(false); // Track if search is open on mobile
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Sulje sivuvalikko klikkauksella ulkopuolelle
  useEffect(() => {
    function handleSidebarClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    if (sidebarOpen) {
      document.addEventListener('mousedown', handleSidebarClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleSidebarClickOutside);
    };
  }, [sidebarOpen]);

  /* Sulje dropdown menu klikkauksella ulkopuolelle */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  /* Sulje kirjautuminen kun on vastaanotettu user token */
  useEffect(() => {
    if (user && user.token) {
      // small delay for closing signin
      const timer = setTimeout(() => {
        setSigninOpen(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [user, user?.token]);
  return (
    <>
    {/* Sivuvalikko */}
      <nav>
        <ul ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <li onClick={() => setSidebarOpen(false)}><article className='sidebarButton'>
        {closeIcon}
        </article></li>
          <li onClick={() => setSidebarOpen(false)}><Link to="/movies">Movies</Link></li>
          <li onClick={() => setSidebarOpen(false)}><Link to="/reviews">Reviews</Link></li>
          <li onClick={() => setSidebarOpen(false)}><Link to="/groups">Groups</Link></li>
          
          { !user || !user.token ? (
            <li onClick={() => { setSigninOpen(true); setSidebarOpen(false); }}><button className="signin-btn">Sign in</button></li>
          ) : null }
        </ul>
        <ul>
          {/* Normaali valikko */}
          <li className={searchOpenOnMobile ? 'hideOnMobileSearch' : ''}><Link to="/">Home</Link></li>
          <li className="btn hideOnMobile"><Link to="/movies">Movies</Link></li>
          <li className="btn hideOnMobile"><Link to="/groups">Groups</Link></li>
          <li className="btn hideOnMobile"><Link to="/reviews">Reviews</Link></li>
          <li className={`menu-btn ${searchOpenOnMobile ? 'hideOnMobileSearch' : ''}`} onClick={() => setSidebarOpen(true)}>
            {menuIcon}
          </li>
          {/* Venyvä hakupainike */}
              <SearchBar 
                searchDestination={'/search'}
                onVisibilityChange={setSearchOpenOnMobile}
              />

        {/* Sisäänkirjautumisnappi */}
        { !user || !user.token ? (
          <button className={`signin-btn ${searchOpenOnMobile ? 'hideOnMobileSearch' : ''}`} onClick={() => setSigninOpen(true)}>
            Sign in
          </button>
        ) : (
          /* Käyttäjämenu */
          <div className={`account-dropdown-wrapper ${searchOpenOnMobile ? 'hideOnMobileSearch' : ''}`} ref={dropdownRef}>
            <button className="signin-btn" onClick={() => setUserMenuOpen((open) => !open)}>
              Account
            </button>
            {userMenuOpen && (
              <div className="account-dropdown">
                <p className="dropdown-greetings">Hi {user?.username || 'User'}!</p>
                <Link to="/myaccount" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>My account</Link>
                <Link to="/myaccount/myfavourites" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>My favourites</Link>
                <Link to="/myaccount/myreviews" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>My reviews</Link>
                
                <Link to="/myaccount/mygroups" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>My groups</Link>
                <button
                  className="dropdown-item"
                  onClick={async () => {
                    await signOut();
                    setUserMenuOpen(false);
                    navigate('/');
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
          </ul>
          </nav>
          {/* Näytä modal vain jos signinOpen === true */}
        {signinOpen && <Authentication onClose={() => setSigninOpen(false)} />}
    </>
  )
}

