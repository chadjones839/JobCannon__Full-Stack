/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from "../nav/Navbar.jsx"
import JobManager from "../modules/JobManager";
import UserManager from "../modules/UserManager";
import { timeSince } from '../modules/HelperFunctions';

/*END IMPORTS*****************************************************************/

const JobDetail = props => {

  const currentTimeStamp = new Date().getTime();
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))

  const [user, setUser] = useState({})
  const [job, setJob] = useState({
    userId: "",
    postDate: "",
    jobTitle: "",
    jobLocation: "",
    salaryEstLow: "",
    salaryEstHigh: "",
    salaryActual: "",
    requirements: "",
    jobSummary: "",
    type: "",
    rate: ""
  });

  let time = job.postDate
  let timeStamp = timeSince(currentTimeStamp, time)

  useEffect(() => {
    JobManager.getJob(props.jobId)
      .then(job => {
        setJob({
          userId: job.userId,
          postDate: job.postDate,
          jobTitle: job.jobTitle,
          jobLocation: job.jobLocation,
          salaryEstLow: job.salaryEstLow,
          salaryEstHigh: job.salaryEstHigh,
          salaryActual: job.salaryActual,
          requirements: job.requirements,
          jobSummary: job.jobSummary,
          type: job.type,
          rate: job.rate
        });
        UserManager.getUser(job.userId)
          .then((response) => {
            setUser(response)
          })
      });
  }, [props.jobId]);


  const deleteListing = id => {
    if (window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) {
      JobManager.deleteJob(id)
    }
  };

  return (
    <div id="root-wrapper">
      <div className="listingHeader">
        <div className="jobListing__header">
          <div className="headerLeft">
            {sessionUser.accountType === "employer"
              ? <div className="jobImage">
                <img
                  src={user.image}
                  alt={user.companyName}
                  onClick={() => props.history.push("/jobs")} />
              </div>
              : <div className="jobImage">
                <img
                  src={user.image}
                  alt={user.companyName}
                  onClick={() => props.history.push(`/jobs/${user.id}/listings`)} />
              </div>}
          </div>
          <div className="headerRight">
            <div className="jobCompany">
              <h3>{user.companyName}</h3>
            </div>
            <div className="jobLocation">
              <h4>{job.jobLocation}</h4>
            </div>
          </div>
        </div>
      </div>
      <section className="detailedJobListing" id={job.id}>
        <div className="jobType__box">
          <div className="jobType__pill" id={job.type}>
            <div className="jobType">
              {job.type}
            </div>
          </div>
          {sessionUser.accountType === "employer"
            ? <div className="jobDetailBtnContainer">
              <div className="jobBtn__Delete">
                <button
                  onClick={() => deleteListing(props.jobId)}
                  className="jobDetailDeleteBtn"
                  type="button"
                >
                  &#128465;
                </button>
              </div>
              <div className="jobBtn__Edit">
                <button
                  onClick={() => props.history.push(`/jobs/${props.jobId}/edit`)}
                  className="jobDetailEditBtn"
                  type="button"
                >
                  &#9998;
                </button>
              </div>
            </div>
            : null}
        </div>
        <section className="jobDetailHeader">
          <div className="jobtitle">
            <h2>{job.jobTitle}</h2>
          </div>
        </section>
        <div className="details__postDate">
          <div className="detailsPostDate__contents">
            {timeStamp}
          </div>
        </div>
        <section className="jobDetails">
          <div className="jobSalary">
            <h5>Est.Salary</h5>
            <p>${job.salaryActual}/{job.rate}</p>
          </div>
          <div className="jobRequirements">
            <h5>Requirements</h5>
            <p>{job.requirements}</p>
          </div>
          <div className="jobSummary">
            <h5>Job Summary</h5>
            <p>{job.jobSummary}</p>
          </div>
          {sessionUser.accountType === "candidate"
            ? <div className="applyBtnContainer">
              <div className="jobBtn__delete">
                <button
                  onClick={() => props.history.push("/apply-confirm")}
                  className="applyBtn"
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>
            : null}
        </section>
      </section>
      <div className="navpanel">
        <Navbar />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
};

export default JobDetail;