import { React, useState } from 'react';
import PopularMovies from '../components/home/PopularMovies';
import Finnkino from '../components/home/Finnkino';
import ExtraLinks from '../components/home/ExtraLinks';
import LatestReviews from '../components/home/LatestReviews';
import FKDataRangePicker from '../components/home/FKDataRangePicker';
import FKTheatreDetails from '../components/home/FKTheatreDetails';
import dayjs from "dayjs";



export default function Home() {
        const [startDate, setStartDate] = useState(dayjs())
        const [endDate, setEndDate] =  useState(dayjs().add(1, "week"));
        const [selectedTheatreId, setSelectedTheatreId] = useState(null);
        const [sortedDetails, setSortedDetails] = useState([])

        console.log("Home render - startDate:", startDate);
        console.log("Home render - endDate:", endDate);
        
        
  return (
    <>
      <div>Home</div>
      <PopularMovies />
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
