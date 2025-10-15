import { React, useState } from "react";
import { useUser } from "../../context/UseUser";
import axios from "axios";

export default function ChangeEmail({ onClose, currentEmail }) {
  const account = useUser();
  const { signOut } = useUser();
  const [user, setUser] = useState({
    email: currentEmail,
    username: account.user.username,
    newEmail: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.newEmail) {
      setErrorMessage("New email is required.");
      return;
    }

    if (user.newEmail === user.email) {
      setErrorMessage("New email must be different from current email.");
      return;
    }

    try {
      const payload = { account: user };
      console.log(payload);
      axios
        .put(import.meta.env.VITE_API_URL + `/users/updateemail`, payload, {
          headers: {
            Authorization: `Bearer ${account.user.token}`,
          },
          withCredentials: true
        })
        .then(async (response) => {
          console.log(response);
          if (response.status == 200) {
            alert("Email changed successfully. Logging out...");
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
            <p>Current Email:</p>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              style={{ backgroundColor: "#e0e0e0", cursor: "not-allowed" }}
            />
          </div>
          <div className="field">
            <p>New Email:</p>
            <input
              type="email"
              name="newEmail"
              value={user.newEmail}
              onChange={handleChange}
              placeholder="Enter new email"
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Change Email
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
