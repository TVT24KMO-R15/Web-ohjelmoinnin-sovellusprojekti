import { React, useEffect, useState } from "react"
import AccountEmailById from "../common/AccountEmailById"


export default function ReviewsPreviewRow(property) {
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState(property)
  const [reviewAndDetails, setReviewAndDetails] = useState({ review: 'null', details: { 'poster_path': '' } })

  function getDetails() {
    if (review != {}) {
      //this part gets movie details for each review

      console.log('getting details')
      //console.log(review.property.movieid)

      const address1 = import.meta.env.VITE_API_URL + `/api/tmdb/details/${review.property.movieid}`
      //console.log(address1)

      fetch(address1)
        .then(response => response.json())
        .then(json => {
          //console.log(json)
          const apuobjekti = { review: review.property, details: json }
          setReviewAndDetails(apuobjekti)
          //console.log(apuobjekti)
        })


    }
    else {
      console.log('reviews is empty')
    }



    if (review != {}) {
      //console.log('loading: '+ loading)
      setLoading(false)
    }
  }

  useEffect(getDetails, [])

  if (loading) {
    console.log('loading: ' + loading)
    return (
      <div>
        Loading...
      </div>)
  }

  if (!loading) {
    return (
      <div>

        <div>

          <article className='myReviewsPreviewArticle'>

            <div className='reviewPreviewDetailsDiv'>
              <h3 className="reviewPreviewTitle">{reviewAndDetails.details.title}</h3>
              <h3 className="reviewPreviewStars">Stars: {reviewAndDetails.review.stars}</h3>
              {(reviewAndDetails.review.reviewtext) ? <p key={reviewAndDetails.review.reviewid} className="reviewPreviewText">{reviewAndDetails.review.reviewtext}</p> : <p className='nowrittenreview'>No written review</p>}
              

              {(window.location.href.includes('/myaccount')) ? <></> : <AccountEmailById key={reviewAndDetails.review.fk_accountid} property={reviewAndDetails.review.fk_accountid} />}
              <p>{String(reviewAndDetails.review.reviewdate).substring(0, 10)}</p>
            </div>
          </article>
        </div>
      </div>
    )
  }
}
