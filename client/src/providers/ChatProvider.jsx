import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ChatContext = React.createContext();

export const ChatProvider = (props) => {
    const apiUrl = "/api/chat";
    const { getToken } = useContext(UserProfileContext);

    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState({});

    const getAllChats = () => {
      getToken().then((token) =>
        fetch(apiUrl, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      )
      .then(resp => resp.json())
      .then(setChats));
    };

    const getUserChats = (id) => {
      getToken().then((token) =>
        fetch(`${apiUrl}/user/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      ))
      .then((resp) => resp.json())
      .then(setChats);
    };

    const getUserMatchChats = (id) => {
      getToken().then((token) =>
        fetch(`${apiUrl}/user-match/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      ))
      .then((resp) => resp.json())
      .then(setChats);
    };

    const getChatById = (id) => {
      getToken().then((token) =>
        fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      ))
      .then((resp) => resp.json())
      .then(setChat);
    };

    const addChat = (chat) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(chat)
        }
      )
      .then(resp => resp.json()));
    };

    const updateChat = (id, chat) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/edit/${id}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(chat)
        })
      )
    };

    const deleteChat = (id) => {
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
        <ChatContext.Provider value={{
            chat, chats, getAllChats, getUserChats, getUserMatchChats, getChatById, addChat, updateChat, deleteChat
        }}>
            {props.children}
        </ChatContext.Provider>
    );

}