import React, { useState, useEffect } from 'react';
import UserManager from "../modules/UserManager.jsx";


const ResumeCard = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [users, setUsers] = useState([]); 
  let user = {};

  users.find(obj => {
    if (obj.id === props.chat.activeUserId) {
      user = obj
      return obj
    }
    else {
      return null
    }
  });
  
  const getUsers = () => {
    return UserManager.getAllUsers()
  }

  useEffect(() => {
    getUsers()
    .then((userResponse) => {
      setUsers(userResponse)
    })
  }, []);

  if (sessionUser.id === props.chat.userId) {
    return (
      <React.Fragment>
        <section className="jobsCard">
          <div className="jobsUserImageContainer">
            <div className="jobsUserImage">
              <img 
                src={user.image} 
                alt={user.firstName}
                onClick={() => props.history.push(`/user-resume/${user.id}`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{user.firstName} {user.lastName}</h4>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else if (sessionUser.id === props.chat.activeUserId) {
    return (
      <React.Fragment>
        <section className="jobsCard">
          <div className="jobsUserImageContainer">
            <div className="jobsUserImage">
              <img 
              src={props.chat.user.image} 
              alt={props.chat.user.firstName}
              onClick={() => props.history.push(`/user-resume/${props.chat.user.id}`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{props.chat.user.firstName} {props.chat.user.lastName}</h4>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else {
    return <div className="empty"></div>;
  }
};

export default ResumeCard;