import React, { useState, useEffect } from "react";
import ChatManager from "../modules/ChatManager";
import Navbar from "../nav/Navbar.jsx"
import ChatCard from "../chat/ChatCard";

const ChatList = props => {

  const [chats, setChats] = useState([]);

  const getChats = () => {
    return ChatManager.getWithUsers()
  }

  useEffect(() => {
    getChats()
      .then((chatResponse) => {
        setChats(chatResponse)
      })
  }, []);

  return (
    <div id="root-wrapper">

      <div className="chatHeader">
        <h3>Chats</h3>
      </div>
      <main className="chatContainer">

        {chats.map(chat =>
          <ChatCard
            key={chat.id}
            chat={chat}
            {...props}
          />
        )}

      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  )
};

export default ChatList;