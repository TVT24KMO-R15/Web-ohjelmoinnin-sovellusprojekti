import { React, useState } from 'react'
import { useUser } from '../../context/UseUser';
import axios from 'axios';

export default function ChangePassword({ onClose, username }) {
    const account = useUser()
    const [newUser, setNewUser] = useState({ password: '', newPassword1: '', newPassword2: '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessagePassword1, setErrorMessagePassword1] = useState('');
    const [errorMessagePassword2, setErrorMessagePassword2] = useState('');
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
        console.log(newUser)
    };
    const containsUppercase = (str) => {
        return /[A-Z]/.test(str);
    }
    const containsNumber = (str) => {
        return /\d/.test(str);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newUser.password || !newUser.newPassword1 || !newUser.newPassword2) {
            setErrorMessage('All fields are required for registration.');
            return;
        } else {
            setErrorMessage('');
        }
         if (!containsUppercase(newUser.newPassword1) || newUser.newPassword1.length < 8 || !containsNumber(newUser.newPassword1)) {
            setErrorMessagePassword1('Must be at least 8 characters with 1 capital letter and number');
            return;
        } else {
            setErrorMessagePassword1('');
        }
        if (newUser.newPassword1 != newUser.newPassword2) {
            setErrorMessagePassword2('New passwords are not the same');
            return;
        } else {
            setErrorMessagePassword2('');
        }


        try {
            const payload = { account: { email: account.user.email, username: username, password: newUser.password, newPassword: newUser.newPassword1 } }
            console.log(payload)
            axios.put(import.meta.env.VITE_API_URL + `/users/updatepassword`, payload)
                .then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        alert('Password changed successfully. Logging out...');
                        sessionStorage.removeItem('user');
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
                        {!errorMessagePassword1 && (
              <p className="field-description">Must be at least 8 characters with 1 capital letter and number</p>
            )}
            {errorMessagePassword1 && (<p className="auth-error">{errorMessagePassword1}</p>)}
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
            {errorMessagePassword2 && (<p className="auth-error">{errorMessagePassword2}</p>)}
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
