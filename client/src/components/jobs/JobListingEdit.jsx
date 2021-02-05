/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import JobManager from "../modules/JobManager";

/*END IMPORTS*****************************************************************/

const JobListingEdit = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState({
    userId: "",
    postDate: "",
    jobTitle: "",
    jobLocation: "",
    salaryActual: "",
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
    setJob(stateToChange)
  };

  const updateJob = event => {
    event.preventDefault();
    setIsLoading(true)

    const editedJob = {
      id: props.match.params.jobId,
      userId: job.userId,
      postDate: job.postDate,
      jobTitle: job.jobTitle,
      jobLocation: job.jobLocation,
      salaryActual: job.salaryActual,
      rate: job.rate,
      requirements: job.requirements,
      jobSummary: job.jobSummary,
      type: job.type,
      keyword1: job.keyword1,
      keyword2: job.keyword2,
      keyword3: job.keyword3
    };

    JobManager.editJob(editedJob)
      .then(() => {
        props.history.push(`/jobs/${props.match.params.jobId}`)
      })

  }

  useEffect(() => {
    JobManager.getJob(props.match.params.jobId)
      .then((job) => {
        setJob(job)
        setIsLoading(false)
      })
  }, [props.match.params.jobId]);

  return (
    <div id="root-wrapper">

      <div className="listingHeader">
        <div className="job__backButton">
          <button
            type="submit"
            className="backBtn"
            onClick={() => props.history.push(`/jobs/${job.id}`)}>
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
              value={job.jobTitle}
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
              value={job.type}
            >
              <option selected disabled hidden></option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Temp">Temp</option>
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
              value={job.jobLocation}
            />

            <div className="salaryFields">
              <div className="salaryEdit">
                <label
                  className="editLabel"
                  htmlFor="salaryActual">
                  Salary
                </label>
                <input
                  type="text"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="salaryActual"
                  value={job.salaryActual}
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
                  value={job.rate}
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
              value={job.requirements}
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
              value={job.jobSummary}
            />

            <label className="editLabel">3 Keywords that describe the job:</label>
            <div className="keywords">
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword1"
                value={job.keyword1}
              />
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword2"
                value={job.keyword2}
              />
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword3"
                value={job.keyword3}
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
          onClick={updateJob}>
          Save Changes
        </button>
      </div>
      <br />
    </div>
  )
};

export default JobListingEdit;