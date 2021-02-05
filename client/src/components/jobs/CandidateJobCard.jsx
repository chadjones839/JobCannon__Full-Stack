import React, { useState, useEffect } from 'react';
import UserManager from "../modules/UserManager.jsx";

const ChatCard = props => {

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
                alt={user.companyName}
                onClick={() => props.history.push(`/jobs/${user.id}/listings`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="jobsUserName">
              <h4>{user.companyName}</h4>
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
              alt={props.chat.user.companyName}
              onClick={() => props.history.push(`/jobs/${props.chat.user.id}/listings`)} />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="jobsUserName">
              <h4>{props.chat.user.companyName}</h4>
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

export default ChatCard;