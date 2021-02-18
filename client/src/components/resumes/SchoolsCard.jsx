import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";

const SchoolsCard = ({school}) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const history = useHistory();
  const { deleteSchool } = useContext(ResumeContext)

  const removeSchool = id => {
    if (window.confirm("Are you sure you want to delete this school? This cannot be undone.")) {
      deleteSchool(id)
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
          {(!school.current)
          ? <h5>{school.startMonth}, {school.startYear} - {school.endMonth}, {school.endYear}</h5>
          : <h5>{school.startMonth}, {school.startYear} - Present</h5>}
        </div>
      </div>
      <section className="experienceCard">
        <div className="titleContainer">
          <div className="jobTitle">
            <h2>{school.schoolName}</h2>
          </div>
          { (sessionUser.candidateId)
          ? <div className="jobDetailBtnContainer">
              <div className="jobBtn__Delete">
                <button 
                  onClick={() => removeSchool(school.id)}
                  className="jobDetailDeleteBtn"
                  type="button"
                  >
                    &#128465;
                </button>
              </div>
              <div className="jobBtn__Edit">
                <button 
                  onClick={() => history.push(`/schools/${school.id}/edit`)}
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
          <h3>{school.field}, <span className="degreeType">{school.degree}</span></h3>
        </div>
      </section> 




    </React.Fragment>
  )   
};

export default SchoolsCard