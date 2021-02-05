import React, { useState } from "react";
import ApplicationViews from "./ApplicationViews.js";
import "./Main.css";

/*END IMPORTS*****************************************************************/

const JobCannon = () => {

  const isAuthenticated = () => sessionStorage.getItem("user") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };

  return (
    <>
      <ApplicationViews hasUser={hasUser} setUser={setUser} />
    </>
  );
};

export default JobCannon;