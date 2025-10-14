import { React, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UseUser';
import axios from 'axios';

export default function PostReview({ onClose, property, onUpdate, reload, movie }) {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const account = useUser()
    const [review, setReview] = (window.location.href.includes('/myreviews')) ? useState({ movieid: String(movie), stars: 1, accountid: account.user.id, reviewtext: '' }) : useState({ movieid: movieId, stars: 1, accountid: account.user.id, reviewtext: '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [count, setCount] = useState(0)
    const [metodi, setMetodi] = useState(property)



    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
        if (e.target.name == 'reviewtext') {
            setCount(e.target.value.length)

        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(metodi)

        try {
            const payload = { review: review }
            //setMethod(reviewMethod)
            console.log(payload)
            const headers = { Authorization: `Bearer ${account.user.token}` }

            if (metodi == 'post') {
                axios.post(import.meta.env.VITE_API_URL + `/reviews/post/`, payload, {headers})
                    .then(response => {
                        console.log(response)
                        if (response.status == 201) {
                            alert('Review posted successfully');
                            onUpdate()
                            onClose()
                            reload()
                        }

                    }
                    ).catch(error => {
                        setErrorMessage('Something went wrong');
                    })
            }
            if (metodi == 'put') {
                axios.put(import.meta.env.VITE_API_URL + `/reviews/put/`, payload, {headers})
                    .then(response => {
                        console.log(response)
                        if (response.status == 201) {
                            alert('Review updated successfully');
                            onUpdate()
                            onClose()
                        }
                    }
                    ).catch(error => {
                        setErrorMessage('Something went wrong');
                    })
            }
        } catch (error) {
            setErrorMessage('Something went wrong');
        }
    }

    return (
        <div className="signin open">
            <form className="auth-modal" onSubmit={handleSubmit}>
                <div className="auth-fields">
                    {errorMessage && (
                        <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
                            {errorMessage}
                        </div>)}

                    <label htmlFor="review">Review:</label>
                    <textarea
                        maxLength={1000}
                        className='review-input'
                        id='review'
                        type="text"
                        name='reviewtext'
                        value={review.reviewtext}
                        onChange={handleChange}
                        placeholder='Write Your Review'
                        autoComplete='off'
                    /><p className='charactercount'>{count} / 1000</p>
                    <label htmlFor="stars">Stars:</label>
                    <select id="stars" name="stars" onChange={handleChange} value={review.stars}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button className="auth-submit" type="submit">
                    Submit Review
                </button>
                <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}
