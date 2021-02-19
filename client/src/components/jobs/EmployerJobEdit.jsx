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

    debugger
    updateJob(id, editedJob)
    history.push(`/jobs/${id}`)

  }

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
            className="backBtn"
            onClick={() => history.push(`/jobs/${job.id}`)}>
            <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToResume" alt="back" />
          </button>
        </div>
        <div className="jobListing__header">
          <h2>Edit Listing</h2>
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

            <label
              className="editLabel"
              htmlFor="type">
              Type
            </label>
            <select
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="type"
              defaultValue={editedJob.type}
            >
              {editedJob.type === "Full-Time" ?
              <option selected value="Full-Time">Full-Time</option> :
              <option value="Full-Time">Full-Time</option> }
              {editedJob.type === "Part-Time" ?
              <option selected value="Part-Time">Part-Time</option> :
              <option value="Part-Time">Part-Time</option> }
              {editedJob.type === "Temp" ?
              <option selected value="Temp">Temp</option> :
              <option value="Temp">Temp</option> }
            </select>

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
                <label
                  className="editLabel"
                  htmlFor="rate">
                  Rate
                </label>
                <select
                  type="text"
                  className="editInputRate"
                  onChange={handleFieldChange}
                  id="rate"
                  defaultValue={editedJob.rate}
                >
                  <option value="Sal">Annually</option>
                  <option value="Hr">Hourly</option>
                </select>
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
      <div className="saveEditChanges">
        <button
          type="button"
          className="blueBtn90"
          id="submitBtn"
          disabled={isLoading}
          onClick={editJob}>
          Save Changes
        </button>
      </div>
      <br />
    </div>
  )
};

export default JobListingEdit;