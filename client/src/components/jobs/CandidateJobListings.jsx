import React, { useState, useEffect } from "react";
import ChatManager from "../modules/ChatManager";
import Navbar from "../nav/Navbar.jsx"
import CandidateJobCard from "../jobs/CandidateJobCard";


const CandidateJobListings = props => {

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

      <div className="jobsHeader">
        <h3>Job Listings</h3>
      </div>
      <h3 className="chooseJobs">Views listings for:</h3>
      <br />
      <br />
      <main className="jobsContainer">

        {chats.map(chat =>
          <CandidateJobCard
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

export default CandidateJobListings