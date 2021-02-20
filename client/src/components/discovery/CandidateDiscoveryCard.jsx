/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useContext } from 'react';
import { ChatContext } from "../../providers/ChatProvider.jsx";

export default function CandidateDiscoveryCard({ candidate }) {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { chats, getAllChats, addChat, updateChat } = useContext(ChatContext);

  const removeMatched = chats.find(chat => {
    if (
      chat.initiatingUserId === candidate.id && 
      chat.reciprocatingUserId === sessionUser.id && 
      chat.mutualInterest === "matched") {
      return chat
      }
    else if (
      chat.reciprocatingUserId === candidate.id && 
      chat.initiatingUserId === sessionUser.id && 
      chat.mutualInterest === "matched")  {
      return chat
    }
    else if (
      chat.reciprocatingUserId === candidate.id && 
      chat.initiatingUserId === sessionUser.id && 
      chat.mutualInterest === "holding") {
      return chat
    }
    else if (
      chat.initiatingUserId === candidate.id && 
      chat.reciprocatingUserId === sessionUser.id && 
      chat.mutualInterest === "noMatch" &&
      chat.reciprocatingInterested === true
      ) {
      return chat
    }
  });

  const letsTalkHandler = (id) => { 
    const existingChat = chats.find(chat => {
      if (id === chat.initiatingUserId && sessionUser.id === chat.reciprocatingUserId) {
        return chat
      }
    });

    if (existingChat === undefined) {
      const newChat = ({
        initiatingUserId: sessionUser.id,
        reciprocatingUserId: id,
        mutualInterest: "holding",
        initiatingInterested: true,
        reciprocatingInterested: false
      })
      addChat(newChat)
    }
    else if (
    existingChat.initiatingUserId === id && 
    existingChat.initiatingInterested === true &&
    existingChat.reciprocatingUserId === sessionUser.id ) {

      const editChat = ({
        id: existingChat.id,
        initiatingUserId: existingChat.initiatingUserId,
        reciprocatingUserId: sessionUser.id,
        mutualInterest: "matched",
        initiatingInterested: existingChat.initiatingInterested,
        reciprocatingInterested: true
      })
      updateChat(existingChat.id, editChat)
    }
    else if (
    existingChat.initiatingUserId === id && 
    existingChat.mutualInterest === "noMatch" &&
    existingChat.reciprocatingUserId === sessionUser.id ) {
      const editChat = ({
        id: existingChat.id,
        initiatingUserId: id,
        reciprocatingUserId: sessionUser.id,
        mutualInterest: "noMatch",
        initiatingInterested: false,
        reciprocatingInterested: true
      })
      updateChat(existingChat.id, editChat)
    };     
  };

 
   const passHandler = (id) => {
    const existingChat = chats.find(chat => {
      if (candidate.id === chat.initiatingUserId && sessionUser.id === chat.reciprocatingUserId) {
        return chat
      }
    })

    if(existingChat === undefined) {
      const newChat = ({
        initiatingUserId: sessionUser.id,
        reciprocatingUserId: id,
        mutualInterest: "holding",
        initiatingInterested: true,
        reciprocatingInterested: false
      })
      addChat(newChat)
    }
    else {
      const editChat = ({
        id: existingChat.id,
        initiatingUserId: sessionUser.id,
        reciprocatingUserId: id,
        mutualInterest: "noMatch",
        initiatingInterested: false,
        reciprocatingInterested: true
      })
      updateChat(existingChat.id, editChat)
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);
  
  if (removeMatched) {
    return null
  }
  else {
    return (
      <React.Fragment>
        <section className="candidateCard">
          <div className="candidateCard__image">
            <img src={candidate.imageUrl} alt={candidate.candidate.firstName} className="candidateCard__logo"/>
          </div>
          <div className="candidateDetails">
            <h2 className="candidateCard__name">{candidate.candidate.firstName}</h2>
            <h4 className="candidateCard__jobTitle">{candidate.candidate.jobTitle}</h4>
          </div>
          <div className="candidateCard__body">
            {candidate.bio}
          </div>
          <br />
        </section>
        <section className="interestButtons">
        <button 
            type="submit" 
            className="falseBtn" 
            onClick={() => passHandler(candidate.id)}
            >
              Hard Pass
          </button>
          <button 
            type="submit" 
            className="trueBtn" 
            onClick={() => letsTalkHandler(candidate.id)}
            >
              Let's Talk
          </button> 
        </section>
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    )
  }  
};