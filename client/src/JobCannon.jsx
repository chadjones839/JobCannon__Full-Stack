import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CandidateProvider } from "./providers/CandidateProvider";
import { EmployerProvider } from "./providers/EmployerProvider";
import { ChatProvider } from "./providers/ChatProvider";
import { MessageProvider } from "./providers/MessageProvider";
import { JobProvider } from "./providers/JobProvider";
import ApplicationViews from "./ApplicationViews.jsx";
import "./Main.css";

const JobCannon = () => {
  return (
    <Router>
      <UserProfileProvider>
        <CandidateProvider>
          <EmployerProvider>
            <ChatProvider>
              <MessageProvider>
                <JobProvider>

                  <ApplicationViews/>

                </JobProvider>
              </MessageProvider>
            </ChatProvider>
          </EmployerProvider>
        </CandidateProvider>
      </UserProfileProvider>
    </Router>
  );
};

export default JobCannon;