import {React, useState} from 'react'

export default function ReviewsForMovie({property}) {
    const [movieId, setMovieId] =useState(property)
  return (
    <div>ReviewsForMovie {movieId}</div>
  )
}
