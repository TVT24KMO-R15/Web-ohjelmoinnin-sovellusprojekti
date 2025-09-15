import React, { useState } from 'react';
import './Authentication.css';

export default function Authentication({ onClose }) {
  const [mode, setMode] = useState('login'); 
  const [user, setUser] = useState({ name: '', email: '', password: '', confirm: '' });
  const isSignup = mode === 'signup';

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Kirjautumislogiikka (kesken)
    alert(`${isSignup ? 'Sign up' : 'Login'}: ${user.email}`);
  };

  return (
    <div className="signin open">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <div className="auth-header">
          <button
            type="button"
            className={`auth-tab${!isSignup ? ' active' : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab${isSignup ? ' active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>
        <div className="auth-fields">
          <div className="field">
            {isSignup && (
           <p>Username</p>
          )}
           {isSignup && (
            <input
              type="username"
              name="username"
              value={user.name}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          )}
          </div>
          <div className="field">
            <p>Email</p>
            <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          </div>
          <div className="field">
            <p>Password</p>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          {isSignup ? 'Sign up' : 'Login'}
        </button>
        <button onClick={onClose} className="close-signin-btn" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </button>
      </form>
    </div>
  );
}
