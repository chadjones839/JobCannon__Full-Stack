import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SchoolContext = React.createContext();

export const SchoolProvider = (props) => {
  const apiUrl = "/api/school";
  const { getToken } = useContext(UserProfileContext);
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState({});

  const getAllSchools = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
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
      fetch(`${apiUrl}/chat/${id}`, {
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
      fetch(`${apiUrl}/recent/${id}`, {
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
      fetch(apiUrl, {
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
      fetch(`${apiUrl}/edit/${id}`, {
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
    <SchoolContext.Provider value= {{
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
    </SchoolContext.Provider>
  );
}