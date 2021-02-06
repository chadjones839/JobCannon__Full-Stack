import React from "react";
import { UserProvider } from "./providers/UserProvider";
import ApplicationViews from "./ApplicationViews.js";
import "./Main.css";

/*END IMPORTS*****************************************************************/

const JobCannon = () => {

  return (
    <>
      <UserProvider>
        <ApplicationViews />
      </UserProvider>
    </>
  );
};

export default JobCannon;