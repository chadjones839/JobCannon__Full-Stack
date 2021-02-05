import React from 'react';
import JobManager from "../modules/JobManager";
import { timeSince } from '../modules/HelperFunctions';

const JobCard = props => {

  const currentTimeStamp = new Date().getTime();
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  let time = props.job.postDate
  let timeStamp = timeSince(currentTimeStamp, time)
  
  const deleteListing = id => {
    if (window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) {
      JobManager.deleteJob(id)
    }
  };

  if (sessionUser.accountType === "employer") {
    return (
      <React.Fragment>
        <main className="jobListing__employerContainer">
          <article className="detailsContainer">
            <section className="job__header">
              <div className="jobType__pill" id={props.job.type}>
                <div className="jobType">
                  {props.job.type}
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
                <h3>{props.job.jobTitle}</h3>
              </div>
              <div className="positionLocation">
                <h4>{props.job.jobLocation}</h4>
              </div>
            </section>

            <section className="topSkills__box">
              <div className="topSkill">
                <h5>{props.job.keyword1}</h5>
              </div>
              <div className="topSkill">
                <h5>{props.job.keyword2}</h5>
              </div>
              <div className="topSkill">
                <h5>{props.job.keyword3}</h5>
              </div>
            </section>

            <section className="jobDescription__box">
              <div className="jobDescription">
                <p>{props.job.jobSummary}</p>
              </div>
            </section>
          </article>
          <section className="jobBtnContainer">
            <div className="jobBtn__delete">
              <button 
                onClick={() => deleteListing(props.job.id)}
                className="jobDeleteBtn"
                type="button"
                >
                  Delete
              </button>
            </div>
            <div className="jobBtn__edit">
              <button 
                onClick={() => props.history.push(`/jobs/${props.job.id}/edit`)}
                className="jobEditBtn"
                type="button"
                >
                  Edit
              </button>
            </div>
            <div className="jobBtn__details">
              <button 
                onClick={() => props.history.push(`/jobs/${props.job.id}`)}
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
  }
  else if (sessionUser.accountType === "candidate") {
    return (
      <React.Fragment>
        <main className="jobListing__container">
          <section className="job__header">
            <div className="jobType__pill" id={props.job.type}>
              <div className="jobType">
                {props.job.type}
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
              <h3>{props.job.jobTitle}</h3>
            </div>
            <div className="positionLocation">
              <h4>{props.job.jobLocation}</h4>
            </div>
          </section>

          <section className="topSkills__box">
            <div className="topSkill">
              <h5>{props.job.keyword1}</h5>
            </div>
            <div className="topSkill">
              <h5>{props.job.keyword2}</h5>
            </div>
            <div className="topSkill">
              <h5>{props.job.keyword3}</h5>
            </div>
          </section>

          <section className="jobDescription__box">
            <div className="jobDescription">
              <p>{props.job.jobSummary}</p>
            </div>
          </section>

          <section className="jobListing__footer">
            <div className="footerBtn">
              <button 
                type="button"
                className="viewJob"
                onClick={() => props.history.push(`/jobs/${props.job.id}`)}>
                View Job
              </button>
            </div>
          </section>
        </main>
      </React.Fragment>
    )  
  } 
};

export default JobCard;