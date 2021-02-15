import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../providers/ChatProvider.jsx";
import Navbar from "../nav/Navbar.jsx"
import CandidateCompaniesCard from "./CandidateCompaniesCard";


const CandidateCompanySelect = () => {

  const { chats, getAllChats } = useContext(ChatContext);

  useEffect(() => {
    getAllChats()
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
          <CandidateCompaniesCard
            key={chat.id}
            chat={chat} />
        )}

      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  )
}

export default CandidateCompanySelect