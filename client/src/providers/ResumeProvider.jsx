import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ResumeContext = React.createContext();

export const ResumeProvider = (props) => {
  const workHistoryUrl = "/api/workHistory";
  const schoolUrl = "/api/school";
  const { getToken } = useContext(UserProfileContext);
  const [workHistories, setWorkHistories] = useState([]);
  const [workHistory, setWorkHistory] = useState({});
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState({});

  const getAllWorkHistory = () => {
    getToken().then((token) =>
      fetch(workHistoryUrl, {
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
      fetch(`${workHistoryUrl}/userId/${id}`, {
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
      fetch(`${workHistoryUrl}/job-id/${id}`, {
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
      fetch(workHistoryUrl, {
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
      fetch(`${workHistoryUrl}/edit/${id}`, {
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
      fetch(`${workHistoryUrl}/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
      })
    )
  };

  const getAllSchools = () => {
    getToken().then((token) =>
      fetch(schoolUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    )
    .then(resp => resp.json())
    .then(setSchools));
  };

  const getSchoolsByUserId = (id) => {
    getToken().then((token) =>
      fetch(`${schoolUrl}/userId/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    ))
    .then((resp) => resp.json())
    .then(setSchools);
  };

  const getSchoolById = (id) => {
    getToken().then((token) =>
      fetch(`${schoolUrl}/school-id/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    ))
    .then((resp) => resp.json())
    .then(setSchool);
  };

  const addSchool = (school) => {
    return getToken().then((token) =>
      fetch(schoolUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(school)
      }
    )
    .then(resp => resp.json()));
  };

  const updateSchool = (id, school) => {
    return getToken().then((token) =>
      fetch(`${schoolUrl}/edit/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(school)
      })
    )
  };

  const deleteSchool = (id) => {
    getToken().then((token) =>
      fetch(`${schoolUrl}/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
      })
    )
  };

  return (
    <ResumeContext.Provider value= {{
        workHistory, 
        workHistories, 
        getAllWorkHistory, 
        getWorkHistoryByUserId, 
        getWorkHistoryById, 
        addWorkHistory, 
        updateWorkHistory, 
        deleteWorkHistory,
        school, 
        schools, 
        getAllSchools, 
        getSchoolsByUserId, 
        getSchoolById, 
        addSchool, 
        updateSchool, 
        deleteSchool
    }}>
        {props.children}
    </ResumeContext.Provider>
  );
}