import { React, useState } from 'react';
import PopularMovies from '../components/home/PopularMovies';
import Finnkino from '../components/home/Finnkino';
import ExtraLinks from '../components/home/ExtraLinks';
import LatestReviews from '../components/home/LatestReviews';
import FKDataRangePicker from '../components/home/FKDataRangePicker';
import FKTheatreDetails from '../components/home/FKTheatreDetails';
import useFinnkinoEvents from '../hooks/useFinnkinoEvents';
import dayjs from "dayjs";

import { Link } from 'react-router-dom'
import DiscoverMoreMoviesButton from '../components/home/DiscoverMoreMoviesButton'


export default function Home() {
        const [startDate, setStartDate] = useState(dayjs())
        const [endDate, setEndDate] =  useState(dayjs().add(1, "week"));
        const [selectedTheatreId, setSelectedTheatreId] = useState(null);

        const { details } = useFinnkinoEvents({
          theatreId: selectedTheatreId,
          startDate,
          endDate
        })
        
  return (
    <>
      <DiscoverMoreMoviesButton />      
      <PopularMovies reqUrl={`${import.meta.env.VITE_API_URL}/api/tmdb/popular`} sectionTitle={"Popular Movies"}/>
      <div className="finnkino-flex-row">
      <Finnkino setSelectedTheatreId={setSelectedTheatreId}/>
      <div className="daterange-box">
        <FKDataRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>

      {selectedTheatreId ? (
        <>

          <FKTheatreDetails details={details} />
        </>
      ) : (
        null
      )}
      
      <ExtraLinks />
      <LatestReviews /> 
    </>
  );
}
