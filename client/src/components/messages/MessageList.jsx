import React, { useState, useEffect } from 'react';
import MessageManager from "../modules/MessageManager";
import MessageCard from "../messages/MessageCard";
import { Link } from "react-router-dom";

const MessageList = props => {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(
    {
      chatId: parseInt(props.match.params.chatId),
      userId: sessionUser.id, 
      content: ""
    });

  const handleFieldChange = event => {
      const stateToChange = {...message}
      stateToChange[event.target.id] = event.target.value
      setMessage(stateToChange)
  }
  
  const postNewMessage = event => {
      event.preventDefault();
      if (message.content === "") {
        window.alert("There's nothing to send")
      } 
      else {
        setIsLoading(true);
        MessageManager.postMessage(message)
        .then(() => {
          document.querySelector("#content").value = ""
        })
      }   
    }

  const getMessages = () => {
    return MessageManager.getAllMessages()
  };

  useEffect(() => {
    getMessages()
    .then((response) => {
      setMessages(response)
    })
  }, [messages])

  
  return (
    <div id="root-wrapper">
        <div className="chatHeader">
          <Link className="nav-link" to="/chat">
            <div className="backButton">
              <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" alt="back" />
            </div>
          </Link>
          <div className="chatName">
            <h3>Chat</h3>
          </div>
          <div className="rightChat">
          </div>
        </div>
      <main className="chatContainer">
          {messages.map(message =>
            <MessageCard 
              key={message.id} 
              message={message}
              {...props} />
          )}      
      </main> 
      <section className="messageInput">
        <div className="messageInput__compose">
          <form className="messageForm__form">
            <fieldset className="messageForm__fieldset">
              <textarea
                className="messageForm__content" 
                name="content"  
                type="text"
                required
                onChange={handleFieldChange}
                id="content"
                placeholder="Say something..."
                autoFocus
                spellCheck={true}
                />
            </fieldset>
          </form>
        </div>
        <div className="messageForm__button">
          <button
            className="messageForm__submit"
            type="button"
            id="msgSend"
            disabled={isLoading}
            onClick={postNewMessage}>
            &#10148;
          </button>                       
        </div>
      </section>      
    </div>
  );
};

export default MessageList;