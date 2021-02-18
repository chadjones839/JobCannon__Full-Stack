import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const WorkHistoryContext = React.createContext();

export const WorkHistoryProvider = (props) => {
  const apiUrl = "/api/workHistory";
  const { getToken } = useContext(UserProfileContext);
  const [workHistories, setWorkHistories] = useState([]);
  const [workHistory, setWorkHistory] = useState({});

  const getAllWorkHistory = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    )
    .then(resp => resp.json())
    .then(setWorkHistories));
  };

  const getWorkHistoryByUserId = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/chat/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    ))
    .then((resp) => resp.json())
    .then(setWorkHistories);
  };

  const getWorkHistoryById = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/recent/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    ))
    .then((resp) => resp.json())
    .then(setWorkHistory);
  };

  const addWorkHistory = (workHistory) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workHistory)
      }
    )
    .then(resp => resp.json()));
  };

  const updateWorkHistory = (id, workHistory) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/edit/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workHistory)
      })
    )
  };

  const deleteWorkHistory = (id) => {
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
    <WorkHistoryContext.Provider value= {{
        workHistory, 
        workHistories, 
        getAllWorkHistory, 
        getWorkHistoryByUserId, 
        getWorkHistoryById, 
        addWorkHistory, 
        updateWorkHistory, 
        deleteWorkHistory
    }}>
        {props.children}
    </WorkHistoryContext.Provider>
  );
}