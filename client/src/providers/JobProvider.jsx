import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const JobContext = React.createContext();

export const JobProvider = (props) => {
  const apiUrl = "/api/job";
  const { getToken } = useContext(UserProfileContext);

  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});

  const getAllJobs = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setJobs));
  };

  const getAllEmployerJobs = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/employer-listings/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setJobs));
  };

  const getJobById = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setJob);
  };

  const addJob = (job) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
      }).then(resp => resp.json()));
  };

  const updateJob = (id, job) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
      }))
  };

  const deleteJob = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }))
  };

  return (
    <JobContext.Provider value={{
      job, jobs, getAllJobs, getAllEmployerJobs, getJobById, addJob, updateJob, deleteJob
    }}>
      {props.children}
    </JobContext.Provider>
  );

}