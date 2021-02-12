/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import FriendManager from "../modules/FriendManager.jsx";
import ChatManager from "../modules/ChatManager.jsx";
import { useParams } from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default function EmployerDiscoveryCard({ user }) {
  
  // const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  // const [friends, setFriends] = useState([]);
  // const [newFriend, setNewFriend] = useState({ 
  //   userId: "", 
  //   activeUserId: "", 
  //   mutualInterest: false});

  // const mapFriend = friends.find(obj => {
  //   if ((user.id === obj.userId && sessionUser.id === obj.activeUserId && obj.mutualInterest === true) || (user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === true))  {
  //     return obj
  //   }
  // });
 
  // const halfFriend = friends.find(obj => {
  //   if ((user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === false) || (user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === null)) {
  //     return obj
  //   }
  // });

  // const passHandler = (id) => {
  //   newFriend.userId = sessionUser.id
  //   newFriend.activeUserId = id
  //   newFriend.mutualInterest = null
  //   FriendManager.postFriend(newFriend)
  // }

  // const friendHandler = () => { 

  //   const editedFriend = {
  //     userId: user.id,
  //     activeUserId: sessionUser.id,
  //     mutualInterest: true
  //   };

  //   const newChat = {
  //     activeUserId: sessionUser.id,
  //     userId: user.id
  //   };

  //   const friend = friends.find(friend => {
  //     if (user.id === friend.userId && sessionUser.id === friend.activeUserId) {
  //       return friend
  //     }
  //   });
      
  //   if (friend === undefined) {
  //     createFriend(user.id)
  //     window.location.reload(true);
  //     return newFriend
  //   }
  //   else if (
  //   friend.userId === user.id && 
  //   friend.mutualInterest !== true &&
  //   friend.activeUserId === sessionUser.id ) {
  //     editedFriend.id = friend.id
  //     FriendManager.editFriend(editedFriend)
  //     .then(()=> {
  //       ChatManager.postChat(newChat)
  //       window.location.reload(true);
  //       return friend
  //     })
  //   }
  //   else if (
  //   friend.userId === user.id && 
  //   friend.mutualInterest === null &&
  //   friend.activeUserId === sessionUser.id ) {
  //     createFriend(user.id)
  //     setNewFriend()
  //     return newFriend
  //   };     
  // };
  
  // const createFriend = (id) => {
  //   newFriend.userId = sessionUser.id
  //   newFriend.activeUserId = id
  //   newFriend.mutualInterest = false
  //   FriendManager.postFriend(newFriend)
  //   .then(()=> {
  //     return newFriend
  //   })
  // }
  
  
  // useEffect(() => {
  //   FriendManager.getAllFriends()
  //     .then((response) => {
  //       setFriends(response)
  //   })
  // }, [friends])

  // if (user.accountType === "employer") {
  //   if (mapFriend) {
  //     return null
  //   }
  //   else if (halfFriend) {
  //     return null
  //   }
  //   else {
      return (
        <React.Fragment>
          <section className="employerCard">
            <div className="employerCard__image">
              <img src={user.imageUrl}  alt={user.employer.Name} className="employerCard__logo"/>
            </div>
            <div className="employerDetails">
              <h2 className="employerCard__name">{user.employer.Name}</h2>
              <h4 className="employerCard__industry">{user.employer.industry}</h4>
            </div>
            <div className="employerCard__body">
              {user.bio}
            </div>
            <br />
          </section>
          <section className="interestButtons">
          <button 
              type="submit" 
              className="falseBtn" 
              // onClick={() => passHandler(user.id)}
              >
                Hard Pass
            </button>
            <button 
              type="submit" 
              className="trueBtn" 
              // onClick={() => friendHandler(user.id)}
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
//     }
//   }
//   else if (user.accountType === "candidate") {
//     return null
//   }
  };