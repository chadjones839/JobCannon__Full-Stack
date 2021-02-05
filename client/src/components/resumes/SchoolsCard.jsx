import React from 'react';
import ResumeManager from '../modules/ResumeManager';

const SchoolsCard = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const deleteSchool = id => {
    if (window.confirm("Are you sure you want to delete this school? This cannot be undone.")) {
      ResumeManager.deleteSchool(id)
      .then(() =>{
        window.location.reload(true)
      })
    }
  };
  return (
    <React.Fragment>
      <div className="timelineContainer">
        <div className="bar">|</div>
        <div className="nextSchool">
          {(props.school.current === false)
          ? <h5>{props.school.startMonth}, {props.school.startYear} - {props.school.endMonth}, {props.school.endYear}</h5>
          : <h5>{props.school.startMonth}, {props.school.startYear} - Present</h5>}
        </div>
      </div>
      <section className="experienceCard">
        <div className="titleContainer">
          <div className="jobTitle">
            <h2>{props.school.schoolName}</h2>
          </div>
          { (sessionUser.accountType === "candidate")
          ? <div className="jobDetailBtnContainer">
              <div className="jobBtn__Delete">
                <button 
                  onClick={() => deleteSchool(props.school.id)}
                  className="jobDetailDeleteBtn"
                  type="button"
                  >
                    &#128465;
                </button>
              </div>
              <div className="jobBtn__Edit">
                <button 
                  onClick={() => props.history.push(`/schools/${props.school.id}/edit`)}
                  className="jobDetailEditBtn"
                  type="button"
                  >
                    &#9998;
                </button>
              </div>
            </div>
          : null }
        </div>
        <div className="degreeContainer">
          <h3>{props.school.field}, <span className="degreeType">{props.school.degree}</span></h3>
        </div>
      </section> 




    </React.Fragment>
  )   
};

export default SchoolsCard