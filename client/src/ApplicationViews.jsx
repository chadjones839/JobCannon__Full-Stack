import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "./providers/UserProfileProvider";

import Home from "./components/auth/Home.jsx";
import Register from "./components/auth/Register.jsx";
import RegisterEmployer from "./components/auth/RegisterEmployer.jsx";
import RegisterCandidate from "./components/auth/RegisterCandidate.jsx";
import Login from "./components/auth/Login.jsx";

import EmployerDiscovery from "./components/discovery/EmployerDiscoveryList.jsx";
import CandidateDiscovery from "./components/discovery/CandidateDiscoveryList.jsx";

import EmployerProfile from "./components/profile/EmployerProfile.jsx";
import EditEmployer from "./components/profile/EditEmployerProfile.jsx";
import CandidateProfile from "./components/profile/CandidateProfile.jsx";
import EditCandidate from "./components/profile/EditCandidateProfile.jsx";
import UserDetail from "./components/profile/UserDetail.jsx";

import Chat from "./components/chat/ChatList.jsx";
import MessageList from "./components/messages/MessageList.jsx";

import EmployerJobList from "./components/jobs/EmployerJobList.jsx";
import JobDetail from "./components/jobs/JobDetail.jsx";
import EmployerJobEdit from "./components/jobs/EmployerJobEdit.jsx";
import EmployerJobForm from "./components/jobs/EmployerJobForm.jsx";
import CandidateCompanySelect from "./components/jobs/CandidateCompanySelect.jsx";
import OpenPositions from "./components/jobs/OpenPositions.jsx";

import UserResume from "./components/resumes/UserResume.jsx";
import ViewResume from "./components/resumes/ViewResume.jsx";
import ResumeList from "./components/resumes/ResumeList.jsx";
import WorkHistory from "./components/resumes/WorkHistoryForm.jsx";
import WorkHistoryEdit from "./components/resumes/WorkHistoryEdit.jsx";

import SkillForm from "./components/resumes/SkillForm.jsx";
import SkillsEdit from "./components/resumes/SkillsEdit.jsx";

import SchoolForm from "./components/resumes/SchoolForm.jsx";
import SchoolEdit from "./components/resumes/SchoolEdit.jsx";

const ApplicationViews = (props) => {

  const { isLoggedIn } = useContext(UserProfileContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <main>
      <Switch>

      <Route exact path="/">
        <Home />
      </Route> 

      <Route exact path="/register"> 
        <Register />
      </Route>

      <Route exact path="/register-employer">
        <RegisterEmployer />
      </Route> 

      <Route exact path="/register-candidate">
        <RegisterCandidate />
      </Route> 

      <Route exact path="/login">
        <Login /> 
      </Route>

      <Route exact path="/profile">
          {!isLoggedIn ? 
          <Redirect to="/"/> : sessionUser.candidateId != null ?
          <CandidateProfile/> : <EmployerProfile/>}
      </Route>

       <Route exact path="/user/edit/:id">
          {!isLoggedIn ? 
          <Redirect to="/"/> : sessionUser.candidateId === null ? 
          <EditEmployer/> : <EditCandidate/>}
      </Route>

      <Route exact path="/users/:id/details">
          {!isLoggedIn ? 
          <UserDetail/> : <Redirect to="/"/>}
      </Route>

      <Route exact path="/discovery">
          {!isLoggedIn ? 
          <Redirect to="/"/> : sessionUser.employerId === null ?
          <EmployerDiscovery/> : <CandidateDiscovery/>}
      </Route>

      <Route exact path="/chat">
         {isLoggedIn ?
         <Chat/> : <Redirect to="/" />
         }
      </Route>

      <Route exact path="/chats/:id" >
        {isLoggedIn ? 
        <MessageList/> : <Redirect to="/" />
        }
      </Route>

      <Route exact path="/jobs" >
        {isLoggedIn ? 
        <EmployerJobList/> : <Redirect to="/" />
        }
      </Route>

      <Route exact path="/jobs/new">
        {isLoggedIn ?
         <EmployerJobForm/> : <Redirect to="/" />}
      </Route>

      <Route exact path="/jobs/edit/:id">
        {isLoggedIn ?
         <EmployerJobEdit/> : <Redirect to="/" />}
      </Route>

      <Route exact path="/job-listings" >
        {isLoggedIn ? 
        <CandidateCompanySelect/> : <Redirect to="/" />
        }
      </Route>

      <Route exact path="/jobs-listings/:id/:employerId">
        {isLoggedIn ?
         <OpenPositions/> : <Redirect to="/" />}
      </Route>

      <Route exact path="/jobs/:id">
        {isLoggedIn ?
         <JobDetail/> : <Redirect to="/" />}
      </Route>
      {/*
      <Route 
        exact
        path="/resume" 
        render={props => {
          return <UserResume {...props} />
        }} 
      />
      <Route 
        exact
        path="/candidates" 
        render={props => {
          return <ResumeList {...props} />
        }} 
      />
      <Route
        exact
        path="/work-history/new"
        render={props => {
          return <WorkHistory
            {...props} />
        }} 
      />
      <Route
        exact
        path="/work-history/:jobId(\d+)/edit"
        render={props => {
          return <WorkHistoryEdit 
            {...props} 
            jobId={props.match.params.jobId} />
        }} 
      />
      <Route
        exact
        path="/skills/new"
        render={props => {
          return <SkillForm
            {...props} />
        }} 
      />
      <Route
        exact
        path="/skills/:skillId(\d+)/edit"
        render={props => {
          return <SkillsEdit 
            {...props} 
            skillId={props.match.params.skillId} />
        }} 
      />
      <Route
        exact
        path="/schools/new"
        render={props => {
          return <SchoolForm
            {...props} />
        }} 
      />
      <Route
        exact
        path="/schools/:schoolId(\d+)/edit"
        render={props => {
          return <SchoolEdit 
            {...props} 
            schoolId={props.match.params.schoolId} />
        }} 
      />
      <Route
        exact
        path="/user-resume/:userId(\d+)"
        render={props => {
          return <ViewResume 
            {...props} 
            userId={props.match.params.userId} />
        }} 
      /> */}

      </Switch>
    </main>
  )
}


export default ApplicationViews