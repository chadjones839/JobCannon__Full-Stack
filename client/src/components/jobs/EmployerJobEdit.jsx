/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { JobContext } from "../../providers/JobProvider.jsx";

/*END IMPORTS*****************************************************************/

const JobListingEdit = props => {

  const { job, getJobById, updateJob} = useContext(JobContext);
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [editedJob, setEditedJob] = useState({
    id: id,
    employerId: "",
    postDate: "",
    jobTitle: "",
    jobLocation: "",
    salary: "",
    rate: "",
    requirements: "",
    jobSummary: "",
    type: "",
    keyword1: "",
    keyword2: "",
    keyword3: ""
  });

  const handleFieldChange = event => {
    const stateToChange = { ...job };
    stateToChange[event.target.id] = event.target.value
    setEditedJob(stateToChange)
  };

  const editJob = event => {
    event.preventDefault();
    setIsLoading(true)

    updateJob({
      id: id,
      employerId: editedJob.employerId,
      postDate: editedJob.postDate,
      jobTitle: editedJob.jobTitle,
      jobLocation: editedJob.jobLocation,
      salary: editedJob.salary,
      rate: editedJob.rate,
      requirements: editedJob.requirements,
      jobSummary: editedJob.jobSummary,
      type: editedJob.type,
      keyword1: editedJob.keyword1,
      keyword2: editedJob.keyword2,
      keyword3: editedJob.keyword3
    });

    updateJob(id, editedJob)
    history.push(`/jobs/${id}`)
  };

  const fullTimeActive = e => {
    const stateToChange = { ...editedJob };
    stateToChange[e.target.name] = e.target.value;
    setEditedJob(stateToChange);
    const fullTime = document.getElementById("fullTime");
    const partTime = document.getElementById("partTime");
    const temp = document.getElementById("temp");
    fullTime.classList.add("selected");
    partTime.classList.remove("selected");
    temp.classList.remove("selected")
  }

  const partTimeActive = e => {
    const stateToChange = { ...editedJob };
    stateToChange[e.target.name] = e.target.value;
    setEditedJob(stateToChange);
    const fullTime = document.getElementById("fullTime");
    const partTime = document.getElementById("partTime");
    const temp = document.getElementById("temp");
    fullTime.classList.remove("selected");
    partTime.classList.add("selected");
    temp.classList.remove("selected")
  }

  const tempActive = e => {
    const stateToChange = { ...editedJob };
    stateToChange[e.target.name] = e.target.value;
    setEditedJob(stateToChange);
    const fullTime = document.getElementById("fullTime");
    const partTime = document.getElementById("partTime");
    const temp = document.getElementById("temp");
    fullTime.classList.remove("selected");
    partTime.classList.remove("selected");
    temp.classList.add("selected")
  }

  const salRateActive = e => {
    const stateToChange = { ...editedJob };
    stateToChange[e.target.name] = e.target.value;
    setEditedJob(stateToChange);
    job.rate = editedJob.rate;
    const salRate = document.getElementById("salRate");
    const hrRate = document.getElementById("hrRate");
    salRate.classList.add("selected");
    hrRate.classList.remove("selected")
  }

  const hrRateActive = e => {
    const stateToChange = { ...editedJob };
    stateToChange[e.target.name] = e.target.value;
    setEditedJob(stateToChange);
    const salRate = document.getElementById("salRate");
    const hrRate = document.getElementById("hrRate");
    salRate.classList.remove("selected");
    hrRate.classList.add("selected")
  }

  console.log(editedJob.type)
  console.log(editedJob.rate)

  useEffect(() => {
    getJobById(id)
  }, [id]);

  useEffect(() => {
    setEditedJob(job)
  }, [job]);

  return (
    <div id="root-wrapper">

      <div className="listingHeader">
        <div className="job__backButton">
          <button
            type="submit"
            className="slimBackBtn"
            onClick={() => history.push(`/job/${job.id}`)}>
            <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToResume" alt="back" />
          </button>
        </div>
        <div className="jobListing__header">
          <h2>Edit Job Listing</h2>
        </div>
        <div className="saveNewJob">
          <button
            type="button"
            className="blueBtn__round"
            id="submitBtn"
            disabled={isLoading}
            onClick={editJob}>
            &#10004;
          </button>
        </div>
      </div>
      <section className="editJobListing" id={job.id}>
        <form className="editProfileForm">
          <fieldset className="editJobDetails">

            <label
              className="editLabel"
              htmlFor="jobTitle">
              Job Title *
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="jobTitle"
              defaultValue={editedJob.jobTitle}
            />

            <div className="jobTypeButtons">
              {editedJob.type === "Full-Time" ?
                <button
                type="button"
                className="jobTypeBtn selected"
                id="fullTime"
                value="Full-Time"
                name="type"
                onClick={fullTimeActive}>
                Full-Time
              </button> :
              <button
                type="button"
                className="jobTypeBtn"
                id="fullTime"
                value="Full-Time"
                name="type"
                onClick={fullTimeActive}>
                Full-Time
              </button>
              }
              {editedJob.type === "Part-Time" ?
              <button
                type="button"
                className="jobTypeBtn selected"
                id="partTime"
                value="Part-Time"
                name="type"
                onClick={partTimeActive}>
                Part-Time
              </button> :
              <button
                type="button"
                className="jobTypeBtn"
                id="partTime"
                value="Part-Time"
                name="type"
                onClick={partTimeActive}>
                Part-Time
              </button>
              }
              {editedJob.type === "Temp" ?
              <button
                type="button"
                className="jobTypeBtn selected"
                id="temp"
                value="Temp"
                name="type"
                onClick={tempActive}>
                Temp
              </button> :
              <button
                type="button"
                className="jobTypeBtn"
                id="temp"
                value="Temp"
                name="type"
                onClick={tempActive}>
                Temp
              </button>
              }
            </div>

            <label
              className="editLabel"
              htmlFor="jobLocation">
              Job Location *
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="jobLocation"
              defaultValue={editedJob.jobLocation}
            />

            <div className="salaryFields">
              <div className="salaryEdit">
                <label
                  className="editLabel"
                  htmlFor="salary">
                  Salary
                </label>
                <input
                  type="text"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="salary"
                  defaultValue={editedJob.salary}
                />
              </div>
              <div className="rateEdit">
                <div className="rateToggle">
                  {editedJob.rate === "Sal" ?
                  <button
                    type="button"
                    className="rateBtn selected"
                    id="salRate"
                    value="Sal"
                    name="rate"
                    onClick={salRateActive}>
                    Sal
                  </button> :
                  <button
                    type="button"
                    className="rateBtn"
                    id="salRate"
                    value="Sal"
                    name="rate"
                    onClick={salRateActive}>
                    Sal
                  </button>
                  }
                  {editedJob.rate === "Hr" ?
                  <button
                    type="button"
                    className="rateBtn selected"
                    id="hrRate"
                    value="Hr"
                    name="rate"
                    onClick={hrRateActive}>
                    Hr
                  </button> :
                  <button
                    type="button"
                    className="rateBtn"
                    id="hrRate"
                    value="Hr"
                    name="rate"
                    onClick={hrRateActive}>
                    Hr
                  </button>
                  }
                </div>
              </div>
            </div>

            <label
              className="editLabel"
              htmlFor="requirements">
              Requirements
            </label>
            <textarea
              type="text"
              className="editInputTextarea"
              onChange={handleFieldChange}
              id="requirements"
              defaultValue={editedJob.requirements}
            />

            <label
              className="editLabel"
              htmlFor="jobSummary">
              Job Summary *
            </label>
            <textarea
              type="text"
              required
              className="editInputTextarea"
              onChange={handleFieldChange}
              id="jobSummary"
              defaultValue={editedJob.jobSummary}
            />

            <label className="editLabel">3 Keywords that describe the job:</label>
            <div className="keywords">
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword1"
                defaultValue={editedJob.keyword1}
              />
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword2"
                defaultValue={editedJob.keyword2}
              />
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword3"
                defaultValue={editedJob.keyword3}
              />
            </div>
            <br/>
            <br/>
            <br/>
          </fieldset>
        </form>
      </section>
    </div>
  )
};

export default JobListingEdit;