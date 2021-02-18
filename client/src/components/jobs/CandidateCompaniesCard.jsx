import React, { useState, useEffect, useContext } from 'react';
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { useHistory } from "react-router-dom";

const CandidateCompaniesCard = ({chat}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { users, getAllUsers } = useContext(UserProfileContext); 
  let user = {};
  let initiatingUser = {};

  users.map(obj => {
    if (obj.id === chat.reciprocatingUserId) {
      user = obj
    }
    else if (obj.id === chat.initiatingUserId){
      initiatingUser = obj
    }
    else {
      return null
    }
  });
  
  useEffect(() => {
    getAllUsers()
  }, []);

  if (!user || !user.employer) {
    return null
  }
  else if (!initiatingUser || !initiatingUser.employer) {
    return null
  }
  else if (sessionUser.id === chat.initiatingUserId) {
    return (
      <React.Fragment>
        <section className="jobsCard">
          <div className="jobsUserImageContainer">
            <div className="jobsUserImage">
              <img 
                src={user.imageUrl} 
                alt={user.employer.name}
                onClick={() => history.push(`/jobs-listings/${user.id}/${user.employerId}`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="jobsUserName">
              <h4>{user.employer.name}</h4>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else if (sessionUser.id === chat.reciprocatingUserId) {
    return (
      <React.Fragment>
        <section className="jobsCard">
          <div className="jobsUserImageContainer">
            <div className="jobsUserImage">
              <img 
              src={initiatingUser.imageUrl} 
              alt={initiatingUser.employer.name}
              onClick={() => history.push(`/job-listings/${initiatingUser.id}/${initiatingUser.employerId}`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="jobsUserName">
              <h4>{initiatingUser.employer.name}</h4>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else {
    return null
  }
};

export default CandidateCompaniesCard;