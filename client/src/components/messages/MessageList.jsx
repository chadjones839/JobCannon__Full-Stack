import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MessageContext } from "../../providers/MessageProvider.jsx";
import MessageCard from "../messages/MessageCard";
import { Link } from "react-router-dom";

export default function MessageList() {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { id } = useParams()
  const { messages, getAllChatMessages, addMessage } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(
    {
      chatId: id,
      userId: sessionUser.id, 
      content: ""
    });

  const handleFieldChange = e => {
      const stateToChange = {...message}
      stateToChange[e.target.id] = e.target.value
      setMessage(stateToChange)
  }
  
  const postNewMessage = e => {
      e.preventDefault();
      if (message.content === "") {
        window.alert("There's nothing to send")
      } 
      else {
        setIsLoading(true);
        addMessage(message)
        .then(() => {
          document.querySelector("#content").value = ""
        })
      }   
    }

  useEffect(() => {
    getAllChatMessages(id)
  }, [])

  
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
              message={message} />
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