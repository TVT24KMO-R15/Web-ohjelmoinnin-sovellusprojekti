import { React, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UseUser';
import axios from 'axios';

export default function PostReview({ onClose }) {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const account = useUser()
    const [review, setReview] = useState({ movieid: movieId, stars: 1, accountid: account.user.id, reviewtext: '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [count, setCount] = useState(0)
    



    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
        setCount(e.target.value.length)
        
        //console.log(review)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { review: review }
            console.log(payload)
            axios.post(import.meta.env.VITE_API_URL + `/reviews/post/`, payload)
            .then(response => {
                console.log(response)
            }
            ) .catch(error => {
                setErrorMessage('Something went wrong');
            })
            //onClose()
            //navigate(`/movies/${movieId}`);
            setErrorMessage('Review posted successfully');
        } catch(error) {
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
