import React, { useEffect, useContext } from "react"
import Navbar from "../nav/Navbar.jsx"
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import CandidateDiscoveryCard from "../discovery/CandidateDiscoveryCard";

export default function CandidateDiscovery() {

  const { candidates, getAllCandidates } = useContext(UserProfileContext);

  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <div id="root-wrapper">
      <h1 className="discoveryHeader">Discovery</h1>
      <main className="discoveryContainer">
      <br/>
        {candidates.map(user =>
          <CandidateDiscoveryCard
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