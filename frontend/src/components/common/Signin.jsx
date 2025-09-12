import './Signin.css'
export default function Signin({ onClose }) {
  return (
    <div className="signin open">
<div><button onClick={onClose} className="close-signin-btn">
  <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
</button></div>
      <form>
        <p>Email</p>
        <p>Password</p>
      </form>
    </div>
  );
}