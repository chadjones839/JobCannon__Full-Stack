/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import ResumeManager from '../modules/ResumeManager';

const WorkHistoryCard = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const deleteJob = id => {
    if (window.confirm("Are you sure you want to delete this listing? This cannot be undone.")) {
      ResumeManager.deleteJob(id)
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
          {(props.job.current === false)
          ? <h5>{props.job.startMonth}, {props.job.startYear} - {props.job.endMonth}, {props.job.endYear}</h5>
          : <h5>{props.job.startMonth}, {props.job.startYear} - Present</h5>}
        </div>
      </div>
      <section className="experienceCard">
        <div className="titleContainer">
          <div className="jobTitle">
            <h2>{props.job.jobTitle}</h2>
          </div>
          { (sessionUser.accountType === "candidate")
          ?  <div className="jobDetailBtnContainer">
              <div className="jobBtn__Delete">
                <button 
                  onClick={() => deleteJob(props.job.id)}
                  className="jobDetailDeleteBtn"
                  type="button"
                  >
                    &#128465;
                </button>
              </div>
              <div className="jobBtn__Edit">
                <button 
                  onClick={() => props.history.push(`/work-history/${props.job.id}/edit`)}
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
          <h3>{props.job.company}</h3>
          <h4>Job Description</h4>
          <p>{props.job.description}</p>
        </div>
      </section> 
    </React.Fragment>
  )   
};

export default WorkHistoryCard