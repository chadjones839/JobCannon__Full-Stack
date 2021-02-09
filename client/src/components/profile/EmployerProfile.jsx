/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import Navbar from "../nav/Navbar.jsx"
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";

const EmployerProfile = () => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { user, getLocalUser, deleteUser } = useContext(UserProfileContext);  

  useEffect(() => {
    getLocalUser(sessionUser.id)
  }, []);

  const clearUser = () => {
    sessionStorage.clear()
    history.push("/")
  }

  const deleteAccount = id => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      deleteUser(id)
        .then(() => {
          clearUser()
        })
    }
  };


  console.log(user)
  
  if (!user || !user.employer) {
    return null
  }

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
              <img src={user.imageUrl} alt={user.employer.name} />
            </div>
          </div>
          <div className="userProfile__right">
          </div>
        </section>
        <section className="userProfile__details">
          <div className="userProfile__name">
            <h2>{user.employer.name}</h2>
          </div>
          <div className="userProfile__location">
            {user.employer.location}
          </div>
        </section>
        <section className="editProfileButton">
          <div className="editBtnContainer">
            <Link
              // onClick={() => history.push(`/user/edit/${user.id}`)}
              className="blueBtn90"
              style={{textDecoration: 'none'}}
              to={`/user/edit/${user.id}`}
              // type="button"
            >
              Edit Profile
              </Link>
          </div>
        </section>
        <section className="profileDetails">
          <dl>
            <dt>Company Name</dt>
            <dd>{user.employer.name}</dd>
            <dt>Industry</dt>
            <dd>{user.employer.industry}</dd>
            <dt>Location</dt>
            <dd>{user.employer.location}</dd>
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