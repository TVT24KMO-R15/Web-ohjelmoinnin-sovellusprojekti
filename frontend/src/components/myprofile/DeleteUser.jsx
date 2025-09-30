import { React, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UseUser';
import axios from 'axios';

export default function DeleteUser({ onClose, email, username }) {
    const navigate = useNavigate();
    const {account, setAccount} = useUser();
    const [user, setUser] = useState({ email: email, password: '', username: username });
    const [errorMessage, setErrorMessage] = useState('');




    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.password) {
            setErrorMessage('Password required for deletion.');
            return;
        }


        try {
            const payload = { account: user }
            console.log(payload)
            axios.post(import.meta.env.VITE_API_URL + `/users/delete`, payload)
                .then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        alert('Account removed successfully. Farewell!');
                        //setAccount({ username: '', email: '', password: '', token: '' });
                        
                        sessionStorage.removeItem('user');
                        //onClose();
                        window.location = '/';
                        
                        
                    }

                }).catch(error => {
                    setErrorMessage('Something went wrong');
                })



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
                    <h5>Input password to confirm deletion.</h5>
                    <h5>NO UNDO!</h5>

                    <div className="field">
                        <p>Current Password:</p>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>

                </div>
                <button className="auth-submit" type="submit">
                    Delete User
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
