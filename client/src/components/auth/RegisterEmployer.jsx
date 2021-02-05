/* eslint-disable array-callback-return */
import React, { useState } from "react";
import UserManager from "../modules/UserManager";


const RegisterEmployer = props => {
  const [user, setNewUser] = useState({
    email: "",
    password: "",
    accountType: "employer",
    image: "https://res.cloudinary.com/dhduglm4j/image/upload/v1596490031/icons/profileNav_lord6y.png",
    companyName: "",
    industry: "",
    userLocation: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    bio: ""
  })

  const setUser = props.setUser
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = evt.target.value;
    setNewUser(stateToChange);
  };

  const constructNewUser = evt => {
    evt.preventDefault();
    let passwordConfirm = document.querySelector("#passwordConfirm").value
    if (user.email === "" || user.password === "" || user.companyName === "" || user.industry === "" || user.userLocation === "") {
      window.alert("Missing fields")
    }
    else if (user.password !== passwordConfirm) {
      window.alert("Your password does not match")
    }
    else {
      setIsLoading(true);
      sessionStorage.setItem("user", JSON.stringify(user))
      setNewUser(user)
      setUser(user)
      UserManager.postUser(user)
        .then(() => {
          UserManager.getAllUsers()
            .then(arr => {
              arr.find(obj => {
                if (obj.email === user.email) {
                  sessionStorage.setItem("user", JSON.stringify(obj))
                  setNewUser(obj)
                  setUser(obj)
                }
              })
            })
        })
        .then(() => {
          props.history.push("/discovery")
        })
        .then(() => {
          window.location.reload(true)
        })
    }
  };

  return (
    <div id="root-wrapper">
      <div className="backButton">
        <button
          type="submit"
          className="backbutton"
          onClick={() => props.history.push("/register")}>
          <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToHome" alt="back" />
        </button>
      </div>
      <main className="registerContainer">
        <h1 className="registerHeader">New Account</h1>
        <div className="registerBox">
          <form>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="email"
                type="text"
                placeholder="Email"
                onChange={handleFieldChange} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleFieldChange} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                type="password"
                placeholder="Confirm Password"
                id="passwordConfirm" />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="companyName"
                type="text"
                placeholder="Company Name"
                onChange={handleFieldChange} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="userLocation"
                type="text"
                placeholder="Location (i.e. Nashville, TN)"
                onChange={handleFieldChange} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="industry"
                type="text"
                placeholder="Company Industry"
                onChange={handleFieldChange} />
            </div>
            <div className="createAccountBtn">
              <button
                type="submit"
                className="loginBtn"
                disabled={isLoading}
                onClick={constructNewUser}>
                Create Account
                </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterEmployer;