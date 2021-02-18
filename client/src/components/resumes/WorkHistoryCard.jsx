/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";

const WorkHistoryCard = ({job}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { deleteWorkHistory } = useContext(ResumeContext);

  const deleteJob = id => {
    if (window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) {
      deleteWorkHistory(id)
      .then(() =>{
        window.location.reload(true)
      })
    }
  };


  return (
    <React.Fragment>
      <div className="timelineContainer">
        <div className="bar">|</div>
        <div className="nextJob">
          {(job.current === false)
          ? <h5>{job.startMonth}, {job.startYear} - {job.endMonth}, {job.endYear}</h5>
          : <h5>{job.startMonth}, {job.startYear} - Present</h5>}
        </div>
      </div>
      <section className="experienceCard">
        <div className="titleContainer">
          <div className="jobTitle">
            <h2>{job.jobTitle}</h2>
          </div>
          { (sessionUser.candidateId)
          ?  <div className="jobDetailBtnContainer">
              <div className="jobBtn__Delete">
                <button 
                  onClick={() => deleteJob(job.id)}
                  className="jobDetailDeleteBtn"
                  type="button"
                  >
                    &#128465;
                </button>
              </div>
              <div className="jobBtn__Edit">
                <button 
                  onClick={() => history.push(`/work-history/${job.id}/edit`)}
                  className="jobDetailEditBtn"
                  type="button"
                  >
                    &#9998;
                </button>
              </div>
            </div>
            : null }
        </div>
        <div className="bodyContainer">
          <h3>{job.company}</h3>
          <h4>Job Description</h4>
          <p>{job.description}</p>
        </div>
      </section> 
    </React.Fragment>
  )   
};

export default WorkHistoryCard