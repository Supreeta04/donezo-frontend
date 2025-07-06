import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();

        localStorage.setItem("token", token);
        localStorage.setItem("uid", user.uid);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("❌ Login Error:", error.message);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="animated-icon">🚀</div>
        <h1>
          Welcome to <span>DoneZo</span>
        </h1>
        <h3 className="tagline">Your Personal Productivity Partner</h3>
       

        <blockquote className="quote">
          "The secret of getting ahead is getting started."
          <span>- Mark Twain</span>
        </blockquote>

        <button className="google-login-btn" onClick={signInWithGoogle}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
      <div className="login-right">
        <img
          src="https://as1.ftcdn.net/v2/jpg/02/74/97/72/1000_F_274977211_LltunvjWJZqBtiHOMoQrsAkpoIzqUsag.jpg"
          alt="Task Management"
        />
      </div>
    </div>
  );
};

export default Login;
