import React, { useState, useEffect } from 'react'
import './Navbar.css'
import Signin from './Signin';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>);
  const menuIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>);
  const searchIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>);
  const searchIconDark = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>);
        
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sivuvalikko, joka on käytössä vain kapeille näytöille
  const [signinOpen, setSigninOpen] = useState(false); // Kirjautumisikkuna
  const [search, setSearch] = useState(""); // Haku
  const [visible, setVisible] = useState(false); // Hakupainikkeen näkyvyys

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 801) {
        setVisible(true); // leveällä näytöllä näkyviin
      } else {
        setVisible(false); // pienemmällä näytöllä piiloon
      }
    };

    handleResize(); // tarkista heti komponentin mountissa

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Hakulogiikka (kesken) */
  const handleSubmit = (e) => {
    console.log("Searching for:", e);
    }; 

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
          <div>
            <li
              className={`show-search ${visible ? "close" : ""}`}
              onClick={() => setVisible(!visible)}
            >
              {visible ? closeIcon : searchIcon}
            </li>

            {visible && (
              <div className="search-bar">
                <input
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)} />
                <button
                  type="button"
                  className="search-icon"
                  onClick={() => handleSubmit(search)}
                >
                  {searchIconDark}
                </button>
              </div>
            )}
          </div>

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

