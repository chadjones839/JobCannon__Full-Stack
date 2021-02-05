/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from "../nav/Navbar.jsx"
import UserManager from "../modules/UserManager";

const EmployerProfile = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [user, setUser] = useState({});

  const getUsers = () => {
    return UserManager.getUser(sessionUser.id)
  };

  const clearUser = () => {
    sessionStorage.clear()
    props.history.push("/")
  }

  const deleteAccount = id => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      UserManager.deleteUser(id)
        .then(() => {
          clearUser()
        })
    }
  };

  useEffect(() => {
    getUsers()
      .then(usersFromAPI => {
        setUser(usersFromAPI)
      })
  }, [user, sessionUser]);

  return (
    <div id="root-wrapper">
      <main className="profileContainer">
        <section className="profileHeader">
          <div className="logoutButton">
            <button
              type="submit"
              className="registerLogout"
              onClick={clearUser}
            >
              <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490026/icons/logoutButton_g0ouwe.png" alt="logout" />
            </button>
          </div>
          <div className="userProfile__image">
            <div className="userImage__container">
              <img src={user.image} alt={user.companyName} />
            </div>
          </div>
          <div className="userProfile__right">
          </div>
        </section>
        <section className="userProfile__details">
          <div className="userProfile__name">
            <h2>{user.companyName}</h2>
          </div>
          <div className="userProfile__location">
            {user.userLocation}
          </div>
        </section>
        <section className="editProfileButton">
          <div className="editBtnContainer">
            <button
              onClick={() => props.history.push(`/users/${user.id}/edit`)}
              className="blueBtn90"
              type="button"
            >
              Edit Profile
              </button>
          </div>
        </section>
        <section className="profileDetails">
          <dl>
            <dt>Company Name</dt>
            <dd>{user.companyName}</dd>
            <dt>Industry</dt>
            <dd>{user.industry}</dd>
            <dt>Location</dt>
            <dd>{user.userLocation}</dd>
            <dt>Bio</dt>
            <dd>{user.bio}</dd>
          </dl>
        </section>
        <div className="deleteBtnContainer">
          <button
            onClick={() => deleteAccount(user.id)}
            className="deleteBtn"
            type="button"
          >
            Delete Account
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  );
};

export default EmployerProfile;