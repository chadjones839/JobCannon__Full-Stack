/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../nav/Navbar.jsx"
import { useHistory, useParams } from "react-router-dom";
import { JobContext } from "../../providers/JobProvider.jsx";
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { timeSince } from '../modules/HelperFunctions';

/*END IMPORTS*****************************************************************/

const JobDetail = () => {

  const currentTimeStamp = new Date().getTime();
  const { id } = useParams();
  const history = useHistory();
  const { job, getJobById, deleteJob } = useContext(JobContext);
  const { user, getUserByEmployerId } = useContext(UserProfileContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  // const [jobListing, setJobListing] = useState({
  //   id: id,
  //   employerId: "",
  //   postDate: "",
  //   jobTitle: "",
  //   jobLocation: "",
  //   salary: "",
  //   rate: "",
  //   requirements: "",
  //   jobSummary: "",
  //   type: "",
  //   keyword1: "",
  //   keyword2: "",
  //   keyword3: "",
  // });

  let time = job.postDate
  let timeStamp = timeSince(currentTimeStamp, time)

  useEffect(() => {
    getJobById(id)
  }, [id, job]);

  useEffect(() => {
    getUserByEmployerId(job.employerId)
  }, [job]);

  const deleteListing = id => {
    if (window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) {
      deleteJob(id)
    }
  };

  if (!user || !user.employer) {
    return null
  }

  return (
    <div id="root-wrapper">
      <div className="listingHeader">
        <div className="jobListing__header">
          <div className="headerLeft">
            {!sessionUser.candidateId
              ? <div className="jobImage">
                <img
                  src={sessionUser.imageUrl}
                  alt={sessionUser.employer.name}
                  onClick={() => history.push("/jobs")} />
              </div>
              : <div className="jobImage">
                <img
                  src={sessionUser.imageUrl}
                  alt={sessionUser.employer.name}
                  onClick={() => history.push(`/jobs/${user.id}/listings`)} />
              </div>}
          </div>
          <div className="headerRight">
            <div className="jobCompany">
              <h3>{user.employer.name}</h3>
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
          {!sessionUser.candidateId
            ? <div className="jobDetailBtnContainer">
              <div className="jobBtn__Delete">
                <button
                  onClick={() => deleteListing(job.id)}
                  className="jobDetailDeleteBtn"
                  type="button"
                >
                  &#128465;
                </button>
              </div>
              <div className="jobBtn__Edit">
                <button
                  onClick={() => history.push(`/jobs/edit/${job.id}`)}
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
            <p>${job.salary}/{job.rate}</p>
          </div>
          <div className="jobRequirements">
            <h5>Requirements</h5>
            <p>{job.requirements}</p>
          </div>
          <div className="jobSummary">
            <h5>Job Summary</h5>
            <p>{job.jobSummary}</p>
          </div>
          {!sessionUser.employerId
            ? <div className="applyBtnContainer">
              <div className="jobBtn__delete">
                <button
                  onClick={() => history.push("/apply-confirm")}
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