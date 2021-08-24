/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react';
import { ChatContext } from "../../providers/ChatProvider.jsx";

export default function CandidateDiscoveryCard({ candidate }) {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { chats, getAllChats, addChat, updateChat } = useContext(ChatContext);

  // removes any employer that is matched with the current user or the current user has already taken an action on the employer
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

  // the "Let's Talk" affordance is clicked
  const letsTalkHandler = (id) => { 
    // Locates an existing instance of chat where current user is reciprocatingUserId and the card is initiatingUserId
    const existingChat = chats.find(chat => {
      if (id === chat.initiatingUserId && sessionUser.id === chat.reciprocatingUserId) {
        return chat
      }
    });

    // If an existing chat cannot be found, this will create a new chat
    if (existingChat === undefined) {
      const newChat = ({
        initiatingUserId: sessionUser.id,
        reciprocatingUserId: id,
        mutualInterest: "holding", // holding indicates that the reciprocating user has not yet taken an action on the current user
        initiatingInterested: true,
        reciprocatingInterested: false
      })
      addChat(newChat)
    }
    // if a chat between the two id's exists, then the chat is updated as a match, and the chat appears in both users chat list
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
    // if a chat instance exists between the two id's, and the reciprocating user clicks hard pass, the chat is updated as a noMatch and the chat does not appear in either users chat list.
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

  // the "Hard Pass" affordance is clicked
  const passHandler = (id) => {
    // Locates exisiting chat where current user is reciprocatingUserId and the card is initiatingUserId
    const existingChat = chats.find(chat => {
      if (candidate.id === chat.initiatingUserId && sessionUser.id === chat.reciprocatingUserId) {
        return chat
      }
    })
    // if there is no existing chat, a new chat is created and the reciprocating user is removed from the current users list
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
    // if a chat exists, it is updated and the initiating user is removed from the current users list
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
  }, [chats]);
  
  if (removeMatched) {
    // loops through user array and removes employers already matched or otherwise have had an action taken on them
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