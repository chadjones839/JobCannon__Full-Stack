import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import UserManager from "../modules/UserManager.jsx";
import MessageManager from "../modules/MessageManager.jsx";

const ChatCard = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [users, setUsers] = useState([]); 
  const [messages, setMessages] = useState([]); 
  let user = {};
  let message = {};

  users.find(obj => {
    if (obj.id === props.chat.activeUserId) {
      user = obj
      return obj
    }
    else {
      return null
    }
  });

  messages.find(obj => {
    if (obj.chatId === props.chat.id) {
      message = obj
      return obj
    }
    else {
      return null
    }
  })
  
  
  const getUsers = () => {
    return UserManager.getAllUsers()
  }
  const getMessages = () => {
    return MessageManager.getAllMessages()
  }

  useEffect(() => {
    getUsers()
    .then((userResponse) => {
      getMessages()
      .then ((msgResponse) => {
        const msgReverse = msgResponse.reverse()
        setUsers(userResponse)
        setMessages(msgReverse)
      })
    })
  }, []);

  if (sessionUser.id === props.chat.userId) {
    return (
      <React.Fragment>
        <section 
          className="chatCard"
          onClick={()=>props.history.push(`/chats/${props.chat.id}`)}>
          <div className="userImageContainer">
            
            <div className="userImage">
              <img src={user.image} alt={user.companyName} />
            </div>
            
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{user.companyName}</h4>
              <h4>{user.firstName}</h4>
            </div>
            <p className="messagePreview">
            {message.content} 
            </p>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else if (sessionUser.id === props.chat.activeUserId) {
    return (
      <React.Fragment>
        <section 
          className="chatCard"
          onClick={()=>props.history.push(`/chats/${props.chat.id}`)}>
          <div className="userImageContainer">
            <div className="userImage">
              <img src={props.chat.user.image} alt="Abstergo" />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{props.chat.user.companyName}</h4>
              <h4>{props.chat.user.firstName}</h4>
            </div>
            <p className="messagePreview">
              {message.content}
            </p>
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