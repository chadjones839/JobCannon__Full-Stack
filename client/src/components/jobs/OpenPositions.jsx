/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import Navbar from "../nav/Navbar.jsx"
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { JobContext } from "../../providers/JobProvider.jsx";
import { useParams } from "react-router-dom";
import OpenPositionsCard from "../jobs/OpenPositionsCard";

export default function OpenPositions() {

  const { id, employerId } = useParams();
  const { user, getLocalUser } = useContext(UserProfileContext);
  const { jobs, getAllEmployerJobs } = useContext(JobContext);
  
  console.log(id)
  useEffect(() => {
    getLocalUser(id)
  }, [id]);
  
  useEffect(() => {
    getAllEmployerJobs(employerId)
  }, []);
  
  console.log(id)

  if (!user.employer) {
    return null
  }
  
  return (
    <div id="root-wrapper">
      <main className="profileContainer">
        <section className="profileHeader">
          <div className="logoutButton">
          
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
        {jobs.map(job =>
          <OpenPositionsCard 
            key={job.id} 
            job={job}
            key={user.id} 
            user={user}/>
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