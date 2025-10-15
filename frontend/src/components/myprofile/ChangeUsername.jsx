import { React, useState } from "react";
import { useUser } from "../../context/UseUser";
import axios from "axios";

export default function ChangeUsername({ onClose, currentUsername }) {
  const account = useUser();
  const { signOut } = useUser();
  const [user, setUser] = useState({
    email: account.user.email,
    username: currentUsername,
    newUsername: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.newUsername) {
      setErrorMessage("New username is required.");
      return;
    }

    if (user.newUsername === user.username) {
      setErrorMessage("New username must be different from current username.");
      return;
    }

    try {
      const payload = { account: user };
      console.log(payload);
      axios
        .put(import.meta.env.VITE_API_URL + `/users/updateusername`, payload, {
          headers: {
            Authorization: `Bearer ${account.user.token}`,
          },
          withCredentials: true
        })
        .then(async (response) => {
          console.log(response);
          if (response.status == 200) {
            alert("Username changed successfully. Logging out...");
            await signOut();
            window.location = "/";
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessage(
              error.response.data.error.message || "Something went wrong"
            );
          } else {
            setErrorMessage("Something went wrong");
          }
        });
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="signin open">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <div className="auth-fields">
          {errorMessage && (
            <div
              className="auth-error"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {errorMessage}
            </div>
          )}

          <div className="field">
            <p>Current Username:</p>
            <input
              type="text"
              name="username"
              value={user.username}
              disabled
              style={{ backgroundColor: "#e0e0e0", cursor: "not-allowed" }}
            />
          </div>
          <div className="field">
            <p>New Username:</p>
            <input
              type="text"
              name="newUsername"
              value={user.newUsername}
              onChange={handleChange}
              placeholder="Enter new username"
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Change Username
        </button>
        <button
          type="button"
          onClick={onClose}
          className="close-signin-btn"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="close-btn"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
