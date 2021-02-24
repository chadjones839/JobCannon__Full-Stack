import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";


const ResumeCard = ({chat}) => {

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

  if (!user || !user.candidate) {
    return null
  }
  else if (!initiatingUser || !initiatingUser.candidate) {
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
                alt={user.candidate.firstName}
                onClick={() => history.push(`/user-resume/${user.id}/${user.candidateId}`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{user.candidate.firstName} {user.candidate.lastName}</h4>
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
              src={chat.user.image} 
              alt={chat.user.firstName}
              onClick={() => history.push(`/user-resume/${initiatingUser.id}/${initiatingUser.candidateId}`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{chat.user.firstName} {chat.user.lastName}</h4>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else {
    return null;
  }
};

export default ResumeCard;