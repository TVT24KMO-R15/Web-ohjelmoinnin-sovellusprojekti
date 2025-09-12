import React, {useState, useEffect} from 'react'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom';

/**
 * Creates a SearchBar react component
 * 
 * 
 * Search result from component gets passed into destination page via {@link useNavigate}
 * 
 * @param URL for search destination (eg. /search)
 * 
 * @returns \<SearchBar\> component
 */
export default function SearchBar({searchDestination}) {
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>);
  const searchIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>);
  const searchIconDark = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>);
  const [search, setSearch] = useState(""); // Haku
  const [visible, setVisible] = useState(false); // Hakupainikkeen näkyvyys
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if(!e.trim()) return; // if text empty
    if (!searchDestination) console.log("SearchBar did not receive a destination!")
    console.log("Searching for: ", e, " in url destination: " + searchDestination);
    console.log("Searchbar navigating to: " + searchDestination)
    navigate(searchDestination, {state:{e}})
  }; 

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


  return (
    <div>
      <button 
      className={`show-search ${visible ? "close" : ""}`} 
      onClick={() => setVisible(!visible)}
    >
      {visible ? closeIcon : searchIcon}
    </button>

      {visible && (
        <div className="search-bar">
          <input
            type="search"
            value={search}
            placeholder="Search"
            onChange={e => setSearch(e.target.value)}
            onKeyUp={e => {if (e.key ==='Enter')handleSubmit(search)}}
          />
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
  )
}
