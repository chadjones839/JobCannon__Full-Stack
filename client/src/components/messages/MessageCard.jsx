/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from 'react';
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { useHistory } from "react-router-dom";

const MessageCard = ({message}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { users, getAllUsers } = useContext(UserProfileContext);
  let user = {}
  
  users.find(obj => {
    if (message.userId === obj.id) {
      user = obj
      return obj
    }
    else {
      return null
    }
  });

  useEffect(() => {
    getAllUsers()
  }, [])

  if (!message || !users) {
    return null
  }
  
  if (message.userId !== sessionUser.id) {
    return (
      <React.Fragment>
        <main className="messageContainer">
          <div className="inboundUser">
            <div className="userContainer">
              <div className="userDetails">
                <div className="userImage">
                  <img 
                  src={user.imageUrl} 
                  alt="userIcon"
                  onClick={() => history.push(`/users/${message.userId}/details`)} />
                </div>
                <div className="inboundContainer">
                  <div className="inboundUserMessage">
                    {message.content}
                  </div>
                </div>
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
        <main className="messageContainer">
          <div className="outboundUser">
            <div className="userContainer">
              <div className="outboundUserDetails">
                <div className="userDetailsContainer">
                  <div className="outboundContainer">
                    <div className="outboundUserMessage">
                      {message.content}
                    </div>
                  </div>
                  <div className="outboundUserImage">
                    <img 
                    src={user.imageUrl} 
                    alt="userIcon" 
                    onClick={() => history.push(`/profile`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>  
      </React.Fragment>
    )
  }
};

export default MessageCard;