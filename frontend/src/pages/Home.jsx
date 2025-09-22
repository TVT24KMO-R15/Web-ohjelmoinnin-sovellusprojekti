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

        console.log("Home parent - startDate:", startDate);
        console.log("Home parent - endDate:", endDate);
        console.log("HOme parent endDate:", endDate.toString());
        
  return (
    <>
    <PopularMovies reqUrl={`http://localhost:3000/api/tmdb/popular`} sectionTitle={"Popular Movies"}/>
    <DiscoverMoreMoviesButton />
      <Finnkino setSelectedTheatreId={setSelectedTheatreId}/>
      <FKDataRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      
      
        
        <FKTheatreDetails
        theatreId={selectedTheatreId}
        startDate={startDate}
        endDate={endDate}
        onSortedChange={setSortedDetails}
           
        
          />
          
        
      
      <ExtraLinks />
      <LatestReviews />
    </>
  );
}
