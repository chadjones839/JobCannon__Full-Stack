import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../providers/ChatProvider.jsx";
import Navbar from "../nav/Navbar.jsx"
import ChatCard from "../chat/ChatCard";

export default function ChatList() {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const { chats, getUserChats } = useContext(ChatContext);

  useEffect(() => {
    getUserChats(sessionUser.id)
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
          />
        )}
      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  )
};