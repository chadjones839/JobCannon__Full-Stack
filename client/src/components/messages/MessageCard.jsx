/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import UserManager from "../modules/UserManager";

const MessageCard = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  let user = {}
  
  const getUsers = () => {
    return UserManager.getWithFriends()
  };

  users.find(obj => {
    if (props.message.userId === obj.id) {
      user = obj
      return obj
    }
    else {
      return null
    }
  });

  useEffect(() => {
    getUsers()
    .then((userResponse) => {
      setUsers(userResponse)
    })
  }, [])
  
  if (props.match.params.chatId == props.message.chatId) {
    if (props.message.userId !== sessionUser.id) {
      return (
        <React.Fragment>
          <main className="inboundUser">
            <div className="userContainer">
              <div className="userDetails">
                  <div className="userImage">
                    <img 
                    src={user.image} 
                    alt="userIcon"
                    onClick={() => props.history.push(`/users/${props.message.userId}/details`)} />
                  </div>
                <div className="inboundUserMessage">
                  {props.message.content}
                </div>
              </div>
            </div>
          </main>  
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <main className="outboundUser">
            <div className="userContainer">
              <div className="outboundUserDetails">
                <div className="userDetailsContainer">
                  <div className="outboundUserMessage">
                    {props.message.content}
                  </div>
                  <div className="outboundUserImage">
                    <img 
                    src={user.image} 
                    alt="userIcon" 
                    onClick={() => props.history.push(`/profile`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>  
        </React.Fragment>
      )
    }
  }
  else {
    return null
  }
}


export default MessageCard;