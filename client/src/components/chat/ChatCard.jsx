import React, { useState, useEffect, useContext } from 'react';
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import UserManager from "../modules/UserManager.jsx";
import MessageManager from "../modules/MessageManager.jsx";

const ChatCard = ({chat}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const history = useHistory();
  const { users, getAllUsers } = useContext(UserProfileContext); 
  const [messages, setMessages] = useState([]); 
  let user = {};
  let message = {};

  console.log(chat)
  console.log(user)

  users.find(obj => {
    if (obj.id === chat.initiatingUserId) {
      user = obj
      return obj
    }
    else {
      return null
    }
  });

  // messages.find(obj => {
  //   if (obj.chatId === chat.id) {
  //     message = obj
  //     return obj
  //   }
  //   else {
  //     return null
  //   }
  // })
  
  
 

  useEffect(() => {
    getAllUsers()
    // .then((userResponse) => {
    //   getMessages()
    //   .then ((msgResponse) => {
    //     const msgReverse = msgResponse.reverse()
    //     setUsers(userResponse)
    //     setMessages(msgReverse)
    //   })
    // })
  }, []);

  if (sessionUser.id === chat.InitiatingUserId && chat.mutualInterest === "matched") {
    return (
      <React.Fragment>
        <section 
          className="chatCard"
          onClick={()=>history.push(`/chats/${chat.id}`)}>
          <div className="userImageContainer">
            
            <div className="userImage">
              <img src={user.imageUrl} alt={users.name} />
            </div>
            
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{user.companyName}</h4>
              <h4>{user.firstName}</h4>
            </div>
            <p className="messagePreview">
            {/* {message.content}  */}
            </p>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else if (sessionUser.id === chat.reciprocatingUserId && chat.mutualInterest === "matched") {
    return (
      <React.Fragment>
        <section 
          className="chatCard"
          onClick={()=>history.push(`/chats/${chat.id}`)}>
          <div className="userImageContainer">
            <div className="userImage">
              <img src={user.imageUrl} alt="Abstergo" />
            </div>
          </div>
          <div className="messageDetailsContainer">
            <div className="messageUserName">
              <h4>{user.name}</h4>
              <h4>{user.firstName}</h4>
            </div>
            <p className="messagePreview">
              {/* {message.content} */}
            </p>
          </div>
        </section>
      </React.Fragment>
    )
  }
  else {
    return <div className="empty"></div>;
  }
};

export default ChatCard;