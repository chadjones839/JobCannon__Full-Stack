/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import FriendManager from "../modules/FriendManager.jsx";
import ChatManager from "../modules/ChatManager.jsx";

/*END IMPORTS*****************************************************************/

const CandidateDiscoveryCard = props => {
  
  const sessionUser = JSON.parse(sessionStorage.getItem("user")) 
  const [friends, setFriends] = useState([]) 
  const [newFriend, setNewFriend] = useState({ 
    userId: "", 
    activeUserId: "", 
    mutualInterest: false})

  const mapFriend = friends.find(obj => {
    if ((props.user.id === obj.userId && sessionUser.id === obj.activeUserId && obj.mutualInterest === true) || (props.user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === true))  {
      return obj
    }
  });
  
  const halfFriend = friends.find(obj => {
    if ((props.user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === false) || (props.user.id === obj.activeUserId && sessionUser.id === obj.userId && obj.mutualInterest === null)) {
      return obj
    }
  });

  const passHandler = (id) => {
    newFriend.userId = sessionUser.id
    newFriend.activeUserId = id
    newFriend.mutualInterest = null
    FriendManager.postFriend(newFriend)
  }

  const friendHandler = () => { 

    // Used to update the friends table to set mutualInterest to "true" when there is an exisiting match in the database.
    const editedFriend = {
      userId: props.user.id,
      activeUserId: sessionUser.id,
      mutualInterest: true
    };

    // Variable holds key/value pairs for the users in a chat after a match is made
    const newChat = {
      activeUserId: sessionUser.id,
      userId: props.user.id
    };

    // When the current user clicks "Let's Chat", the friendHandler function first looks for an existing match in the database where the clicked cards's user Id matches the userId key AND the activeUserId matches the sessionUser's Id.
    const friend = friends.find(friend => {
      if (props.user.id === friend.userId && sessionUser.id === friend.activeUserId) {
        // if an object is found, it returns the friend object.
        return friend
      }
    });
    
    // If no friend object is found with the specified conditionals, the friend is undefined, and a new friend is created with the mutualInterest set as "false"
    if (friend === undefined) {
      createFriend(props.user.id)
      setNewFriend()
      return newFriend
    }
    //If a friend object is found, and the mutual interest is set to "false", then the friend object is edited using the 'editedFriend' variable model, which updates to true
    else if (
    friend.userId === props.user.id && 
    friend.mutualInterest === false &&
    friend.activeUserId === sessionUser.id ) {
      editedFriend.id = friend.id
      FriendManager.editFriend(editedFriend)
      .then(()=> {
        // When the friend is updated with a mutualInterest of "true", then a new chat is also created using the 'newChat' variable model, giving the two users the option to have a private chat with one another.
        ChatManager.postChat(newChat)
        return friend
      })
    }
    // A user can click 'Hard Pass' if they aren't interested in the user card, which runs the passHandler function. The passHandler function creates an object with both userId's stored and a mutualInterest value "null" (for the purpose of filtering out  passed users from the discovery list). This conditional creates a new friend object and removes that card from their list.
    else if (
      friend.userId === props.user.id && 
      friend.mutualInterest === null &&
      friend.activeUserId === sessionUser.id ) {
        createFriend(props.user.id)
        setNewFriend()
        return newFriend
      };     
  };
  
  const createFriend = (id) => {
    newFriend.userId = sessionUser.id
    newFriend.activeUserId = id
    newFriend.mutualInterest = false
    FriendManager.postFriend(newFriend)
  }
  
  useEffect(() => {
    FriendManager.getAllFriends()
      .then((response) => {
        setFriends(response)
    })
  }, [friends])
  
  if (props.user.accountType === "candidate") {
    if (mapFriend) {
      return null
    }
    else if (halfFriend) {
      return null
    }
    else {
      return (
        <React.Fragment>
          <section className="employerCard">
            <div className="employerCard__image">
              <img src={props.user.image} alt={props.user.firstName} className="employerCard__logo"/>
            </div>
            <div className="employerDetails">
              <h2 className="employerCard__name">{props.user.firstName}</h2>
              <h4 className="employerCard__industry">{props.user.jobTitle} | <span className="industry">{props.user.industry}</span></h4>
            </div>
            <div className="employerCard__body">
              {props.user.bio}
            </div>
            <br />
          </section>
          <section className="interestButtons">
          <button 
              type="submit" 
              className="falseBtn" 
              onClick={() => passHandler(props.user.id)}>
                Hard Pass
            </button>
            <button 
              type="submit" 
              className="trueBtn" 
              onClick={() => friendHandler(props.user.id)}>
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
  }
  else if (props.user.accountType === "employer") {
    return null
  }
  
};


export default CandidateDiscoveryCard;