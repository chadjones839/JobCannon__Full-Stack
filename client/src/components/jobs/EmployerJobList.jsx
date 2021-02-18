/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../nav/Navbar.jsx"
import { JobContext } from "../../providers/JobProvider.jsx";
import { useHistory } from "react-router-dom";
import JobCard from "./JobCard";

const EmployerJobList = () => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const history = useHistory();
  const { jobs, getAllJobs } = useContext(JobContext);

  useEffect(() => {
    getAllJobs()
  }, []);

  return (
    <div id="root-wrapper">
      <main className="profileContainer">
        <section className="profileHeader">
          <div className="logoutButton">
          
          </div>
          <div className="userProfile__image">
            <div className="userImage__container">
              <img src={sessionUser.imageUrl} alt={sessionUser.nme} />
            </div>
          </div>
          <div className="userProfile__right">
          </div>
        </section>
        <section className="userProfile__details">
          <div className="userProfile__name">
            <h2>{sessionUser.employer.name}</h2>
          </div>
          <div className="userProfile__location">
          {sessionUser.employer.location}
          </div>
        </section>
        <div className="addListingContainer">
          <button 
            onClick={() => history.push(`/jobs/new`)}
            className="blueBtn90"
            type="button"
            >
              Add Listing
          </button>
        </div>    
        {jobs.map(job =>
          <JobCard 
            key={job.id} 
            job={job} />
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
};

export default EmployerJobList;