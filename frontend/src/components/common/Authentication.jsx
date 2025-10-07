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
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [errorMessageUsername, setErrorMessageUsername] = useState('');

  /* Reset form state when switching modes */
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    setErrorMessageEmail('');
    setErrorMessagePassword('');
    setErrorMessageUsername('');

    if (newMode === 'signin') {
      setUser({ email: '', password: '' }); 
    } else {
      setUser({ username: '', email: '', password: '' }); 
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const containsUppercase = (str) => {
  return /[A-Z]/.test(str);
}
const containsNumber = (str) => {
  return /\d/.test(str);
}
const containsOnlyLettersAndNumbers = (str) => {
  return /^[A-Za-z0-9]+$/.test(str);
}
const registerValidate = (user) => {
  let valid = true;
  if (!user.password || !containsUppercase(user.password) || user.password.length < 8 || !containsNumber(user.password)) {
    setErrorMessagePassword('Must be at least 8 characters with 1 capital letter and number');
    valid = false;
  } else {
    setErrorMessagePassword('');
  }

  if (!user.username || user.username.length > 15 || !containsOnlyLettersAndNumbers(user.username)) {
    setErrorMessageUsername('15 characters max, letters and numbers only');
    valid = false;
  } else {
    setErrorMessageUsername('');
  }

  if (!user.email) {
    setErrorMessageEmail('Please enter an email');
    valid = false;
  } else {
    setErrorMessageEmail('');
  }
  return valid;
};

const loginValidate = (user) => {
  let valid = true;
  if (!user.email) {
    setErrorMessageEmail('Please enter an email');
    valid = false;
  } else {
    setErrorMessageEmail('');
  }
  if (!user.password) {
    setErrorMessagePassword('Please enter a password');
    valid = false;
  } else {
    setErrorMessagePassword('');
  }
  return valid;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  /* Frontend validation */
  const isValid = isSignup ? registerValidate(user) : loginValidate(user);
  if (!isValid) {
    return;
  }

  try {
    const payload = isSignup
      ? user
      : { email: user.email, password: user.password };

    const action = isSignup ? signUp : signIn;
    await action(payload);

    setErrorMessage('Successfully ' + (isSignup ? 'signed up' : 'signed in') + '!');
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
            <div className="auth-error">
              {errorMessage}
            </div>
          )}

          {isSignup && (
            <div className="field">
              <p className="field-label">Username</p>
              <input
                type="text"
                name="username"
                value={user.username || ''}
                onChange={handleChange}
                placeholder="Username"
              />
              {!errorMessageUsername && (
                <p className="field-description">15 characters max, letters and numbers only</p>
              )}
              {errorMessageUsername && (<p className="auth-error">{errorMessageUsername}</p>)}
            </div>
          )}

          <div className="field">
            <p className="field-label">Email</p>
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
              placeholder="Email"
            />
             {errorMessageEmail && (<p className="auth-error">{errorMessageEmail}</p>)}
          </div>

          <div className="field">
            <p className="field-label">Password</p>
            <input
              type="password"
              name="password"
              value={user.password || ''}
              onChange={handleChange}
              placeholder="Password"
            />
            {!errorMessagePassword && isSignup && (
              <p className="field-description">Must be at least 8 characters with 1 capital letter and number</p>
            )}
            {errorMessagePassword && (<p className="auth-error">{errorMessagePassword}</p>)}
          </div>
        </div>

        <button className="auth-submit" type="submit">
          {isSignup ? 'Sign up' : 'Sign in'}
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
