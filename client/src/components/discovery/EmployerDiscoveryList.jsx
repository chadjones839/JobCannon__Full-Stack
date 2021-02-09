import React, { useEffect, useContext } from 'react';
import Navbar from "../nav/Navbar.jsx"
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import EmployerDiscoveryCard from "../discovery/EmployerDiscoveryCard";

export default function EmployerDiscovery() {

  const { employers, getAllEmployers } = useContext(UserProfileContext);

  useEffect(() => {
    getAllEmployers();
  }, []);
  
  console.log(employers)

  return (
    <div id="root-wrapper">

      <h1 className="discoveryHeader">Discovery</h1>
      <main className="discoveryContainer">
      <br/>
        {employers.map(user =>
          <EmployerDiscoveryCard
            key={user.id}
            user={user} />
        )}
      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  );
};