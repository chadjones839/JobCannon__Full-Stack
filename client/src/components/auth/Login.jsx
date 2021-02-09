/* eslint-disable array-callback-return */
import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";



export default function Login() {

  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/profile"))
      .catch(() => alert("Invalid email or password"));
  };


  return (
    <div id="root-wrapper">
      <div className="backButton">
        <button
          type="submit"
          className="backbutton"
          onClick={() => history.push("/")}>
          <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToHome" alt="back" />
        </button>
      </div>
      <main className="loginContainer">
        <h1 className="loginHeader">Login</h1>

        <form className="loginForm" onSubmit={loginSubmit}>

          <div className="form-input">
            <input onChange={e => setEmail(e.target.value)}
              className="inputField"
              type="text"
              id="email"
              placeholder="Email" />
          </div>

          <div className="form-input">
            <input onChange={e => setPassword(e.target.value)}
              className="inputField"
              type="password"
              id="password"
              placeholder="Password" />
          </div>

          <div className="container-login-form-btn">
            <div className="wrap-login-form-btn">
              <button
                type="submit"
                className="loginBtn">
                Login
              </button>
            </div>
          </div>
        </form>
      </main>
      </div>

  );
};