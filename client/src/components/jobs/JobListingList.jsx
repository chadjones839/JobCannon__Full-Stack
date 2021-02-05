/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from "../nav/Navbar.jsx"
import JobManager from "../modules/JobManager";
import UserManager from "../modules/UserManager";
import JobCard from "../jobs/JobCard";

const JobList = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState([]);
  
  const getJobs = () => {
    if(sessionUser.accountType === "employer") {
      return JobManager.getWithUser(sessionUser.id)
    }
    else {
      return JobManager.getWithUser(props.match.params.userId)
    }
  };

  const getUser = () => {
    return UserManager.getUser(props.match.params.userId)
  }

  useEffect(() => {
    getJobs()
    .then(response => {
      getUser()
      .then(userResponse => {
        setJobs(response)
        setUser(userResponse)
      })
    })
  }, []);

  if (sessionUser.accountType === "employer") {
    return (
      <div id="root-wrapper">
        <main className="profileContainer">
          <section className="profileHeader">
            <div className="logoutButton">
            
            </div>
            <div className="userProfile__image">
              <div className="userImage__container">
                <img src={sessionUser.image} alt={sessionUser.companyName} />
              </div>
            </div>
            <div className="userProfile__right">
            </div>
          </section>
          <section className="userProfile__details">
            <div className="userProfile__name">
              <h2>{sessionUser.companyName}</h2>
            </div>
            <div className="userProfile__location">
            {sessionUser.userLocation}
            </div>
          </section>
          <div className="addListingContainer">
            <button 
              onClick={() => props.history.push(`/jobs/new`)}
              className="blueBtn90"
              type="button"
              >
                Add Listing
            </button>
          </div>    
          {jobs.map(job =>
            <JobCard 
              key={job.id} 
              job={job}
              {...props} />
          )}
        </main>
        <div className="navpanel">
          <Navbar />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  else if (sessionUser.accountType === "candidate") {
    return (
      <div id="root-wrapper">
        <main className="profileContainer">
          <section className="profileHeader">
            <div className="logoutButton">
            
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
          {jobs.map(job =>
            <JobCard 
              key={job.id} 
              job={job}
              {...props} />
          )}
        </main>
        <div className="navpanel">
          <Navbar />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  };

export default JobList;