import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Authentication.css';
import { useUser } from "../../context/UseUser";

export default function Authentication({ onClose }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const isSignup = mode === 'signup';
  const { user, setUser, signUp, signIn } = useUser();
  const [errorMessage, setErrorMessage] = useState('');

  /* Reset form state when switching modes */
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setErrorMessage('');

    if (newMode === 'signin') {
      setUser({ email: '', password: '' }); 
    } else {
      setUser({ username: '', email: '', password: '' }); 
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Frontend validation */
    if (isSignup) {
      if (!user.username || !user.email || !user.password) {
        setErrorMessage('All fields are required for registration.');
        return;
      }
    } else {
      if (!user.email || !user.password) {
        setErrorMessage('Email and password are required for login.');
        return;
      }
    }

    try {
      const payload = isSignup
        ? user
        : { email: user.email, password: user.password };

      const action = isSignup ? signUp : signIn;
      await action(payload);

      setErrorMessage('');
      navigate('/');
    } catch (error) {
      setErrorMessage(error?.message || String(error));
    }
  };

  return (
    <div className="signin open">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <div className="auth-header">
          <button
            type="button"
            className={`auth-tab${!isSignup ? ' active' : ''}`}
            onClick={() => handleModeChange('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`auth-tab${isSignup ? ' active' : ''}`}
            onClick={() => handleModeChange('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="auth-fields">
          {errorMessage && (
            <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          {isSignup && (
            <div className="field">
              <p>Username</p>
              <input
                type="text"
                name="username"
                value={user.username || ''}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
          )}

          <div className="field">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="field">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={user.password || ''}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>

        <button className="auth-submit" type="submit">
          {isSignup ? 'Sign up' : 'Login'}
        </button>

        <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </button>
      </form>
    </div>
  );
}
