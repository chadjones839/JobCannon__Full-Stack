import React, { useEffect, useContext } from "react";
import { ChatContext } from "../../providers/ChatProvider.jsx";
import Navbar from "../nav/Navbar.jsx"
import ResumeCard from "../resumes/ResumeCard";


const ResumeList = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { chats, getUserMatchChats } = useContext(ChatContext);

  useEffect(() => {
    getUserMatchChats(sessionUser.id)
  }, []);
  console.log(chats)

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