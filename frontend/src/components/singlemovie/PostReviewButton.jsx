import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewsForMovie.css'
import PostReview from './PostReview';

import { useUser } from '../../context/UseUser';

export default function PostReviewButton({ onUpdate }) {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(true);
    const [postReviewOpen, setPostReviewOpen] = useState(false);
    const [allowReview, setAllowReview] = useState(false);
    const [reloadButton, setReloadButton] = useState(false)

    const account = useUser()

    useEffect(() => {
        try {
            axios.get(import.meta.env.VITE_API_URL + `/reviews/movieuser/${movieId}/${account.user.id}`)
                .then(response => {
                    console.log(response)
                    if (response.data.length == 0) {
                        setAllowReview(true)
                    } else {
                        setAllowReview(false)
                    }
                }
                ).catch(err => {
                    console.error('Failed to fetch reviews', err)

                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.error('Failed to fetch reviews', err)
        }
    }, [reloadButton])


    if (loading) return <div>Loading...</div>;
    if (!allowReview) {
        return <>{(account.user.id) ? <div>
            <button className='review-button' onClick={() => setPostReviewOpen(true)}>Edit Your Own Review</button>
            {postReviewOpen && (<PostReview  onClose={() => { setPostReviewOpen(false); }} property={'put'} onUpdate={() => { onUpdate();}} reload={() => {setReloadButton(!reloadButton);}} />)}
        </div> : <p>Log in to post your own review</p>}</>

    }
    if (allowReview) {
        return (
            <div>
                <button className='review-button' onClick={() => setPostReviewOpen(true)}>Post Your Own Review</button>
                {postReviewOpen && (<PostReview  onClose={() => { setPostReviewOpen(false); }} property={'post'} onUpdate={() => { onUpdate();}} reload={() => {setReloadButton(!reloadButton);}} />)}
            </div>
        )
    }
}
