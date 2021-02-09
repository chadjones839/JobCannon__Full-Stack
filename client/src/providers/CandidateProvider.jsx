import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CandidateContext = React.createContext();

export const CandidateProvider = (props) => {
    const apiUrl = "/api/candidate";
    const { getToken } = useContext(UserProfileContext);

    const [candidates, setCandidates] = useState([]);
    const [candidate, setCandidate] = useState({});

    const getAllCandidates = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCandidates));
    };

    const getAllLeads = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/leads`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCandidates));
    };

    const getAllCandidatesByUser = (id) => {
        return getToken().then((token) =>
            fetch(`/api/candidate/mycandidates${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setCandidates));
    }

    const getById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setCandidate);
    };

    const addCandidate = (candidate) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(candidate)
        }).then(resp => resp.json()));
    };

    const updateCandidate = (id, candidate) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/edit/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(candidate)
            }))
    };

    const deleteCandidate = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            }))

    return (
        <CandidateContext.Provider value={{
            candidate, candidates, getAllCandidates, getAllLeads, getById, addCandidate, updateCandidate, deleteCandidate, setCandidate, getAllCandidatesByUser
        }}>
            {props.children}
        </CandidateContext.Provider>
    );

}