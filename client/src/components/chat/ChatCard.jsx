import React, { useState, useEffect, useContext } from 'react';
import { MessageContext } from "../../providers/MessageProvider.jsx";
import { useHistory } from "react-router-dom";


const ChatCard = ({chat}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { messages, getAllMessages } = useContext(MessageContext);
  let message = {};

  messages.find(obj => {
    if (obj.chatId === chat.id) {
      message = obj
      return obj
    }
    else {
      return null
    }
  })
 
  useEffect(() => {
    getAllMessages()
  }, []);

  if (!chat || !chat.reciprocatingUser || !chat.initiatingUser || !message) {
    return null
  }

  if (sessionUser.id === chat.initiatingUserId && chat.mutualInterest === "matched") {
    return (
      <React.Fragment>
        <section 
          className="chatCard"
          onClick={()=>history.push(`/chats/${chat.id}`)}>
          <div className="userImageContainer">
            
            <div className="userImage">
              <img src={chat.reciprocatingUser.imageUrl} alt={chat.reciprocatingUser.employer.name} />
            </div>
            
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{chat.reciprocatingUser.employer.name}</h4>
              <h4>{chat.reciprocatingUser.candidate.firstName}</h4>
            </div>
            <p className="messagePreview">
            {message.content} 
            </p>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else if (sessionUser.id === chat.reciprocatingUserId && chat.mutualInterest === "matched") {
    return (
      <React.Fragment>
        <section 
          className="chatCard"
          onClick={()=>history.push(`/chats/${chat.id}`)}>
          <div className="userImageContainer">
            <div className="userImage">
              <img src={chat.initiatingUser.imageUrl} alt="Abstergo" />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{chat.initiatingUser.employer.name}</h4>
              <h4>{chat.initiatingUser.candidate.firstName}</h4>
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