/* eslint-disable array-callback-return */
import React, { useState } from "react"
import LoginManager from "../modules/LoginManager";


const Login = props => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // const setUser = props.setUser

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    LoginManager.getAll()
      .then(users => {
        users.find(user => {
          if (user.email === email && user.password === password) {
            sessionStorage.setItem('user', JSON.stringify(user))
            setCredentials(user);
            props.setUser(user)
          }
        })
      })
      .then(() =>
        props.history.push("/discovery")
      )
      .then(() =>
        window.location.reload(true)
      )
  }


  return (
    <div id="root-wrapper">

      <div className="backButton">
        <button
          type="submit"
          className="backbutton"
          onClick={() => props.history.push("/")}>
          <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToHome" alt="back" />
        </button>
      </div>
      <main className="loginContainer">
        <h1 className="loginHeader">Login</h1>

        <form className="loginForm" onSubmit={handleLogin}>

          <div className="form-input">
            <input onChange={handleFieldChange}
              className="inputField"
              type="text"
              id="email"
              placeholder="Email" />
          </div>

          <div className="form-input">
            <input onChange={handleFieldChange}
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

export default Login;