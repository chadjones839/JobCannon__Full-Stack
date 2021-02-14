import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const MessageContext = React.createContext();

export const MessageProvider = (props) => {
  const apiUrl = "/api/message";
  const { getToken } = useContext(UserProfileContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});

  const getAllMessages = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    )
    .then(resp => resp.json())
    .then(setMessages));
  };

  const getAllChatMessages = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/chat/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    ))
    .then((resp) => resp.json())
    .then(setMessages);
  };

  const getLastChatMessage = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/recent/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    ))
    .then((resp) => resp.json())
    .then(setMessage);
  };

  const addMessage = (message) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      }
    )
    .then(resp => resp.json()));
  };

  const updateMessage = (id, message) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/edit/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      })
    )
  };

  const deleteMessage = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
      })
    )
  };

  return (
    <MessageContext.Provider value= {{
        message, 
        messages, 
        getAllMessages, 
        getAllChatMessages, 
        getLastChatMessage, 
        addMessage, 
        updateMessage, 
        deleteMessage
    }}>
        {props.children}
    </MessageContext.Provider>
  );
}