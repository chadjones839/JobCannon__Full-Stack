import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./ApplicationViews.jsx";
import "./Main.css";

const JobCannon = () => {
  return (
    <Router>
      <UserProfileProvider>
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
};

export default JobCannon;