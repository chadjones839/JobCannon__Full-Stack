import React, { useEffect, useContext } from 'react';
import { JobContext } from "../../providers/JobProvider.jsx";
import { useHistory } from "react-router-dom";
import { timeSince } from '../modules/HelperFunctions';

const OpenPositionsCard = ({job}) => {

  const history = useHistory();

  const currentTimeStamp = new Date().getTime();
  let time = job.postDate
  let timeStamp = timeSince(currentTimeStamp, time)
 
  return (
    <React.Fragment>
      <main className="jobListing__container">
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

        <section className="jobListing__footer">
          <div className="footerBtn">
            <button 
              type="button"
              className="viewJob"
              onClick={() => history.push(`/jobs/${job.id}`)}>
              View Job
            </button>
          </div>
        </section>
      </main>
    </React.Fragment>
  )  
};

export default OpenPositionsCard;