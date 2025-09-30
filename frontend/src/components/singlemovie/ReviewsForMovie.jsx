import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AccountEmailById from '../common/AccountEmailById';
import axios from 'axios';
import './ReviewsForMovie.css'
import PostReviewButton from './PostReviewButton';

import { useUser } from '../../context/UseUser';

export default function ReviewsForMovie() {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState(null)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [nextDisabled, setNextDisabled] = useState(true)
    const [previousDisabled, setPreviousDisabled] = useState(true)
    const [reloadState, setReloadState] = useState(false)

    const account = useUser()

    useEffect(() => {
        console.log('reloadState: '+ reloadState)
        setReviews(null)
        const offset = limit * page
        const address = import.meta.env.VITE_API_URL + `/reviews/movie/${movieId}/${limit}/${offset}`
        axios.get(address)
            .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                    setReviews(response.data)

                    if (response.data.length == limit) {
                        console.log('made it here')
                        setNextDisabled(false);
                    }
                    if (page == 0) {
                        setPreviousDisabled(true)
                    } else {
                        setPreviousDisabled(false)
                    }

                }
                if (response.data.length == 0 && page > 0) {
                    setReviews(response.data)
                    setNextDisabled(true)
                    setPreviousDisabled(false)
                }
                //console.log(reviews)
            }
            )
            .catch(err => {
                console.error('Failed to fetch reviews', err)
                //setReviews([])
            })
            .finally(() => {
                setLoading(false)
            })

    }, [page, reloadState]);

    if (loading) return <div>Loading...</div>;
    if (!reviews) return <><div className='moviereviewsborder'>No reviews... yet!</div><PostReviewButton onUpdate={() => setReloadState(!reloadState)} /></>;

    if (reviews) return (
        <><div className='moviereviewsborder'>
            <h3>Reviews</h3>

            {reviews.map(item => (
                <div className='moviereview' key={item.reviewid}>
                    <h4><AccountEmailById key={item.fk_accountid} property={item.fk_accountid} /></h4>
                    {(item.reviewtext) ? <p key={item.reviewid}>{item.reviewtext}</p> : <p className='nowrittenreview'>No written review</p>}
                    <h4 key={item.stars}>Stars: {item.stars}</h4>
                    <h5 key={item.reviewdate}>{String(item.reviewdate).substring(0, 10)}</h5>
                </div>
            ))}
            <button id='previousReviews' className='pagechangebutton' disabled={previousDisabled} onClick={() => { setPage(page - 1) }}>←</button>
            <button id='nextReviews' className='pagechangebutton' disabled={nextDisabled} onClick={() => { setPage(page + 1) }}>→</button>
            
            
        </div><PostReviewButton onUpdate={() => setReloadState(!reloadState)} />
        </>
    )
}
