/* eslint-disable array-callback-return */
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { EmployerContext } from "../../providers/EmployerProvider.jsx";


const RegisterEmployer = props => {

  const history = useHistory();
  const { register, login } = useContext(UserProfileContext);
  const { addEmployer } = useContext(EmployerContext);
  const [name, setName] = useState();
  const [industry, setIndustry] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const imageUrl = "https://res.cloudinary.com/dhduglm4j/image/upload/v1596490031/icons/profileNav_lord6y.png";
  const bio = "";
  const candidateId = null;

  const employer = {
    name: name,
    industry: industry,
    location: location
  }

  const user = {
    email: email,
    imageUrl: imageUrl,
    bio: bio,
    candidateId: candidateId
  }

  const constructNewUser = e => {
    e.preventDefault();
    if (name === "" || password === "" || name === "" || industry === "" || location === "") {
      window.alert("Missing fields")
    }
    else if (password !== confirmPassword) {
      window.alert("Your password does not match")
    }
    else {
      addEmployer(employer)
      .then((e) => {
        console.log(e.id)
        user.employerId = e.id
        register(user, password)
        .then((u) => {
          login(u.email, password)
          .then(() => history.push("/discovery"));
        })
      })
    }
  };

  return (
    <div id="root-wrapper">
      <div className="backButton">
        <button
          type="submit"
          className="backbutton"
          onClick={() => history.push("/register")}>
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
                onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                type="password"
                id="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                type="password"
                placeholder="Confirm Password"
                id="passwordConfirm" 
                onChange= {e => setConfirmPassword(e.target.value)}/>
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="name"
                type="text"
                placeholder="Company Name"
                onChange={e => setName(e.target.value)} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="location"
                type="text"
                placeholder="Location (i.e. Nashville, TN)"
                onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="industry"
                type="text"
                placeholder="Company Industry"
                onChange={e => setIndustry(e.target.value)} />
            </div>
            <div className="createAccountBtn">
              <button
                type="submit"
                className="loginBtn"
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