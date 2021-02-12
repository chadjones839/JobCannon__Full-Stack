import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const EmployerContext = React.createContext();

export const EmployerProvider = (props) => {
    const apiUrl = "/api/employer";
    const { getToken } = useContext(UserProfileContext);

    const [employers, setEmployers] = useState([]);
    const [employer, setEmployer] = useState({});

    const getAllEmployers = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setEmployers));
    };

    const getAllLeads = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/leads`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setEmployers));
    };

    const getAllEmployersByUser = (id) => {
        return getToken().then((token) =>
            fetch(`/api/employer/myemployers${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => resp.json())
                .then(setEmployers));
    }

    const getEmployerById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then(setEmployer);
    };

    const addEmployer = (employer) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employer)
        }).then(resp => resp.json()));
    };

    const updateEmployer = (id, employer) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/edit/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employer)
            }))
    };

    const deleteEmployer = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            }))

    return (
        <EmployerContext.Provider value={{
            employer, employers, getAllEmployers, getAllLeads, getEmployerById, addEmployer, updateEmployer, deleteEmployer, setEmployer, getAllEmployersByUser
        }}>
            {props.children}
        </EmployerContext.Provider>
    );

}