import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { timeSince } from '../modules/HelperFunctions';
import { JobContext } from "../../providers/JobProvider.jsx";

const JobCard = ({job}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const history = useHistory();
  const { deleteJob } = useContext(JobContext);

  const currentTimeStamp = new Date().getTime();
  let time = job.postDate
  let timeStamp = timeSince(currentTimeStamp, time)
  
  const deleteListing = id => {
    if (window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) {
      deleteJob(id)
    }
  };

  if (job.employerId !== sessionUser.employerId) {
    return null
  }

  return (
    <React.Fragment>
      <main className="jobListing__employerContainer">
        <article className="detailsContainer">
          <section className="job__header">
            <div className="jobType__pill" id={job.type}>
              <div className="jobType">
                {job.type}
              </div>
            </div>
            <div className="postDate">
              <div className="postDate__contents">
                {timeStamp}
              </div>
            </div>
          </section>
          <section className="position__box">
            <div className="positionTitle">
              <h3>{job.jobTitle}</h3>
            </div>
            <div className="positionLocation">
              <h4>{job.jobLocation}</h4>
            </div>
          </section>

          <section className="topSkills__box">
            <div className="topSkill">
              <h5>{job.keyword1}</h5>
            </div>
            <div className="topSkill">
              <h5>{job.keyword2}</h5>
            </div>
            <div className="topSkill">
              <h5>{job.keyword3}</h5>
            </div>
          </section>

          <section className="jobDescription__box">
            <div className="jobDescription">
              <p>{job.jobSummary}</p>
            </div>
          </section>
        </article>
        <section className="jobBtnContainer">
          <div className="jobBtn__delete">
            <button 
              onClick={() => deleteListing(job.id)}
              className="jobDeleteBtn"
              type="button"
              >
                Delete
            </button>
          </div>
          <div className="jobBtn__edit">
            <button 
              onClick={() => history.push(`/jobs/edit/${job.id}`)}
              className="jobEditBtn"
              type="button"
              >
                Edit
            </button>
          </div>
          <div className="jobBtn__details">
            <button 
              onClick={() => history.push(`/jobs/${job.id}`)}
              className="jobDetailBtn"
              type="button"
              >
                Details
            </button>
          </div>
        </section>
      </main>
    </React.Fragment>
  )  
};

export default JobCard;