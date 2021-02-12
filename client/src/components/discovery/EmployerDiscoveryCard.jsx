/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useContext } from 'react';
import { ChatContext } from "../../providers/ChatProvider.jsx";

export default function EmployerDiscoveryCard({ employer }) {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { chats, getAllChats, addChat, updateChat } = useContext(ChatContext);

  const removeMatched = chats.find(chat => {
    if (
      chat.initiatingUserId === employer.id && 
      chat.reciprocatingUserId === sessionUser.id && 
      chat.mutualInterest === "matched") {
      return chat
      }
    else if (
      chat.reciprocatingUserId === employer.id && 
      chat.initiatingUserId === sessionUser.id && 
      chat.mutualInterest === "matched")  {
      return chat
    }
    else if (
      chat.reciprocatingUserId === employer.id && 
      chat.initiatingUserId === sessionUser.id && 
      chat.mutualInterest === "holding") {
      return chat
    }
    else if (
      chat.initiatingUserId === employer.id && 
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
      if (employer.id === chat.initiatingUserId && sessionUser.id === chat.reciprocatingUserId) {
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
        <section className="employerCard">
          <div className="employerCard__image">
            <img src={employer.imageUrl}  alt={employer.employer.Name} className="employerCard__logo"/>
          </div>
          <div className="employerDetails">
            <h2 className="employerCard__name">{employer.employer.Name}</h2>
            <h4 className="employerCard__industry">{employer.employer.industry}</h4>
          </div>
          <div className="employerCard__body">
            {employer.bio}
          </div>
          <br />
        </section>
        <section className="interestButtons">
        <button 
            type="submit" 
            className="falseBtn" 
            onClick={() => passHandler(employer.id)}
            >
              Hard Pass
          </button>
          <button 
            type="submit" 
            className="trueBtn" 
            onClick={() => letsTalkHandler(employer.id)}
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