import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/user";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [users, setUsers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getAllUsers = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setUsers));

  const getAllCandidates = () =>
    getToken().then((token) =>
      fetch(`${apiUrl}/candidates`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setCandidates));

  const getAllEmployers = () =>
    getToken().then((token) =>
      fetch(`${apiUrl}/employers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setEmployers));

  const login = (email, pw) => {
    debugger
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getFirebaseUser(signInResponse.user.uid))
      .then((userProfile) => {
        debugger
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => addUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };

  const getFirebaseUser = (firebaseUserProfileId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserProfileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getLocalUser = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/userId/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const addUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const updateUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${userProfile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }));
  };

  const deleteUser = (id) =>
    getToken().then((token) =>
        fetch(`${apiUrl}/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        }))

  const addCandidate = (candidate) => {
      return fetch("/api/candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(candidate)
      }).then(resp => resp.json());
  };

  return (
    <UserProfileContext.Provider value={{ users, candidates, employers, isLoggedIn, userProfile, login, logout, register, getToken, setUsers, getAllUsers, getAllCandidates, getAllEmployers, getFirebaseUser, getLocalUser, addUser, updateUser, deleteUser, addCandidate }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  );
}