import React from 'react'
import "./ReviewsPreview.css"

import { Link } from 'react-router-dom'

export default function ReviewsPreview() {
  return (
    <>
      <h3>Reviews</h3>
      <Link to='./myreviews'>See all</Link>
    </>
  )
}
