import React, {useState, useEffect, useRef} from 'react'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom';

/**
 * Creates a SearchBar react component
 * 
 * 
 * Search result from component gets passed into destination page via {@link useNavigate}
 * 
 * @param URL for search destination (eg. /search)
 * @param defaultValue to pre-fill the search input (searching from homepage, also sets the value in moviesearch)
 * @param onChangeMovieName callback function to update movie name in parent component (used in MovieFilters to update movieName state)
 * @param alwaysVisible when true, search bar is always visible regardless of screen size
 * @param onVisibilityChange callback function to notify parent when search visibility changes on mobile
 * @returns \<SearchBar\> component
 */
export default function SearchBar({searchDestination, defaultValue, onChangeMovieName, alwaysVisible = false, onVisibilityChange}) {
  const closeIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>);
  const searchIcon = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>);
  const searchIconDark = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>);
  const [search, setSearch] = useState(defaultValue ? defaultValue : ""); // Haku, set value if going from homepage
  const [visible, setVisible] = useState(false); // Hakupainikkeen näkyvyys
  const navigate = useNavigate();
  const inputRef = useRef(null); // changeable variable that doesnt trigger rerender

  const handleSubmit = (e) => {
    if(!e.trim()) return; // if text empty
    if (!searchDestination) console.log("SearchBar did not receive a destination!")
    console.log("Searching for: ", e, " in url destination: " + searchDestination);
    console.log("Searchbar navigating to: " + searchDestination)
    navigate(searchDestination, {state:{e}})
  }; 

  useEffect(() => {
    if (alwaysVisible) { // dont run if always visible
      setVisible(true);
      return;
    }
    const mediaQueryList = window.matchMedia('(min-width: 801px)'); // create mediaquery listener for width
    const onChange = (e) => setVisible(e.matches); // set visibility based on if media query matches the screen size
    mediaQueryList.addEventListener('change', onChange); // add listener to the media query
    // set initial value to match current screen size
    setVisible(mediaQueryList.matches);
    // cleanup listener on unmount
    return () => { mediaQueryList.removeEventListener('change', onChange); };
  }, [alwaysVisible]);

  // Notify parent when visibility changes on mobile
  useEffect(() => {
    if (onVisibilityChange && window.innerWidth <= 800) {
      onVisibilityChange(visible);
    }
  }, [visible, onVisibilityChange]);


  return (
    <div className ="search-bar-container">
      {/* Hide the toggle button when alwaysVisible is true */}
      {!alwaysVisible && (
        <button 
        className={`show-search ${visible ? "close" : ""}`} 
        onClick={() => setVisible(!visible)}
      >
        {visible ? closeIcon : searchIcon}
      </button>
      )}

      {visible && (
        <div className="search-bar">
          <input
            ref={inputRef}
            type="search"
            value={search}
            placeholder="Search"
            onChange={e => { // set search state to this component and parent component 
              const value = e.target.value;
              setSearch(value);
              if (onChangeMovieName) { // call parent function if exists ,used in MovieFilters to re-set moviename for filtering
                onChangeMovieName(value);
              }
            }}
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
