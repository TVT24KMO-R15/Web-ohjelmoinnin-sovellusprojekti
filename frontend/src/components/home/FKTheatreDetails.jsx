import React from 'react'
import dayjs from "dayjs";
import './FKTheatreDetails.css'
function FKTheatreDetails({ details = [] }) {
  return (
    <div className='theatreResultsDiv'>
      {details.map((detail, index) => (
        <div key={index} className="grid-item">
          <p className="title">{detail.title}</p>
          {detail.image && <img src={detail.image} alt={detail.title} />}
          <p>Year: {detail.year}</p>
          <p>Genres: {detail.genres}</p>
          <p>Rating: {detail.rating}</p>
          <p>Premiere: {dayjs(detail.showing).format('DD.MM.YYYY')}</p>
        </div>
      ))}
    </div>
  )
}

export default React.memo(FKTheatreDetails)