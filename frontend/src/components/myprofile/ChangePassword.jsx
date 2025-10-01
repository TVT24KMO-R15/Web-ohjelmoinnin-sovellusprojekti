import { React, useState } from 'react'
import { useUser } from '../../context/UseUser';
import axios from 'axios';

export default function ChangePassword({ onClose, username }) {
    const account = useUser()
    const [newUser, setNewUser] = useState({ password: '', newPassword1: '', newPassword2: '' })
    const [errorMessage, setErrorMessage] = useState('');




    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
        console.log(newUser)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newUser.password || !newUser.newPassword1 || !newUser.newPassword2) {
            setErrorMessage('All fields are required for registration.');
            return;
        } else if (newUser.newPassword1 != newUser.newPassword2) {
            setErrorMessage('New passwords are not the same');
            return;
        }


        try {
            const payload = { account: { email: account.user.email, username: username, password: newUser.password, newPassword: newUser.newPassword1 } }
            console.log(payload)
            axios.put(import.meta.env.VITE_API_URL + `/users/updatepassword`, payload)
                .then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        alert('Password changed successfully.');
                        onClose()
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

                    <div className="field">
                        <p>Current Password:</p>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>
                    <div className="field">
                        <p>New Password:</p>
                        <input
                            type="password"
                            name="newPassword1"
                            value={newUser.password1}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>
                    <div className="field">
                        <p>New Password Again:</p>
                        <input
                            type="password"
                            name="newPassword2"
                            value={newUser.password2}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </div>
                </div>
                <button className="auth-submit" type="submit">
                    Change Password
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
