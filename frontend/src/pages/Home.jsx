import { React, useState } from 'react';
import PopularMovies from '../components/home/PopularMovies';
import Finnkino from '../components/home/Finnkino';
import ExtraLinks from '../components/home/ExtraLinks';
import LatestReviews from '../components/home/LatestReviews';
import FKDataRangePicker from '../components/home/FKDataRangePicker';
import FKTheatreDetails from '../components/home/FKTheatreDetails';
import dayjs from "dayjs";

import { Link } from 'react-router-dom'
import DiscoverMoreMoviesButton from '../components/home/DiscoverMoreMoviesButton'


export default function Home() {
        const [startDate, setStartDate] = useState(dayjs())
        const [endDate, setEndDate] =  useState(dayjs().add(1, "week"));
        const [selectedTheatreId, setSelectedTheatreId] = useState(null);
        const [sortedDetails, setSortedDetails] = useState([])
  const [movieCards, setMovieCards] = useState(8) // how many cards of movies to show, default 8
  const [page, setPage] = useState(1) // which page of popular results to show, default 1

        console.log("Home render - startDate:", startDate);
        console.log("Home render - endDate:", endDate);

  const getMoreMovies = () => {
    // console.log(`Current page: ${page}, current results limit: ${movieCards}`);
    setMovieCards(prev => prev + 8)
    // console.log("Results increased: ", movieCards+8) // this doesnt instantly show 8+8 for some reason
    if (movieCards > 20) {
      // console.log("Results went past pagination limit, increasing pages...")
      setPage(prev=>prev+1)
    }
    // console.log("Current page: ", page)
  }
        
  return (
    <>
    {/* use page and amount of movie cards shown as key to force refresh of the element when the key updates */}
    <PopularMovies key={`${page}-${movieCards}`} reqUrl={`http://localhost:3000/api/tmdb/popular/${page}`} sectionTitle={"Popular Movies"} resultLimit={movieCards}/>
    <button onClick={getMoreMovies}>Get more popular movies</button>
    <DiscoverMoreMoviesButton />
      <Finnkino setSelectedTheatreId={setSelectedTheatreId}/>
      <FKDataRangePicker
      
        setStartDate={setStartDate}
        startDate={startDate}
        setEndDate={setEndDate}
        endDate={endDate}
        
        
      />
      
      
        <>
          <FKTheatreDetails
            theatreId={selectedTheatreId}
            onSortedChange={setSortedDetails}
            startDate={startDate}
            endDate={endDate}
           
          
          />
          
        </>
      
      <ExtraLinks />
      <LatestReviews />
    </>
  );
}
