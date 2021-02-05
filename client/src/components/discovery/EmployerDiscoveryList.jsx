import React, { useState, useEffect } from 'react';
import Navbar from "../nav/Navbar.jsx"
import UserManager from "../modules/UserManager";
import EmployerDiscoveryCard from "../discovery/EmployerDiscoveryCard";

const EmployerDiscovery = props => {

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return UserManager.getWithFriends()
  };

  useEffect(() => {
    getUsers()
      .then((userResponse) => {
        setUsers(userResponse)
      })
  }, [])

  return (
    <div id="root-wrapper">

      <h1 className="discoveryHeader">Discovery</h1>
      <main className="discoveryContainer">
      <br/>
        {users.map(user =>
          <EmployerDiscoveryCard
            key={user.id}
            user={user}
            {...props} />
        )}
      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  );
};

export default EmployerDiscovery;