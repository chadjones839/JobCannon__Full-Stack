/* eslint-disable array-callback-return */
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { CandidateContext } from "../../providers/CandidateProvider.jsx";


const RegisterCandidate = props => {
  
  const history = useHistory();
  const { register, addCandidate } = useContext(UserProfileContext);
  // const { addCandidate } = useContext(CandidateContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [candidateId, setCandidateId] = useState();
  const imageUrl = "https://res.cloudinary.com/dhduglm4j/image/upload/v1596490031/icons/profileNav_lord6y.png";
  const bio = "";
  const employerId = null;

  const candidate = {
    firstName: firstName,
    lastName: lastName,
    location: location,
    jobTitle: ""
  }

  const user = {
    email: email,
    imageUrl: imageUrl,
    bio: bio,
    candidateId: candidateId,
    employerId: employerId
  }

  const registerUser = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } 
    else if (firstName === "" || lastName === "" || email === "" || location === "") {
      alert("Missing fields.");
    }
    else {
      // debugger
      addCandidate(candidate)
      .then((c) => {
        console.log(c)
        setCandidateId(c.id)
        register(user, password)
          .then(() => history.push("/discovery"));
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
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={e => setFirstName(e.target.value)} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="lastName"
                type="text"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)} />
            </div>

            <div className="form-input">
              <input
                required
                className="inputField"
                id="userLocation"
                type="text"
                placeholder="Location (i.e. Nashville, TN)"
                onChange={e => setLocation(e.target.value)} />
            </div>

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
                onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div className="createAccountBtn">
              <button
                type="submit"
                className="loginBtn"
                onClick={registerUser}>
                Create Account
                </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterCandidate;