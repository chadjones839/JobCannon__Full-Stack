import React, { useState, useEffect } from "react";
import ChatManager from "../modules/ChatManager";
import Navbar from "../nav/Navbar.jsx"
import ResumeCard from "../resumes/ResumeCard";


const ResumeList = props => {

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

      <div className="resumesHeader">
        <h3>Resumes</h3>
      </div>
      <h3 className="chooseJobs">View Resumes for:</h3>
      <br />
      <br />
      <main className="resumesContainer">

        {chats.map(chat =>
          <ResumeCard
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
}

export default ResumeList