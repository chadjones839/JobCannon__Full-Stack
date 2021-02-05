import React, { useState, useEffect } from 'react';
import ResumeManager from '../modules/ResumeManager';

const WorkHistoryEdit = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [job, setJob] = useState({
    userId: sessionUser.id,
    jobTitle: "",
    company: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: isChecked,
    description: ""
  });

  const checkBoxValue = evt => {
    if (!isChecked) {
      job.current = true
      job.endMonth = ""
      job.endYear = ""
      document.querySelector("#endDateFields").style.display = "none"
      setIsChecked(true);
    }
    else {
      job.current = false
      document.querySelector("#endDateFields").style.display = "flex"
      setIsChecked(false)
    }
  }

  const handleFieldChange = evt => {
    const stateToChange = { ...job };
    stateToChange[evt.target.id] = evt.target.value;
    setJob(stateToChange);
  };

  const updateJob = event => {
    event.preventDefault();
    setIsLoading(true)

    const editedJob = {
      id: props.match.params.jobId,
      userId: sessionUser.id,
      jobTitle: job.jobTitle,
      company: job.company,
      startMonth: job.startMonth,
      startYear: job.startYear,
      endMonth: job.endMonth,
      endYear: job.endYear,
      current: job.current,
      description: job.description
    }

    ResumeManager.editJob(editedJob)
      .then(() => {
        props.history.push("/resume")
      })
  }

  useEffect(() => {
    ResumeManager.getJob(props.match.params.jobId)
      .then((job) => {
        setJob(job)
        setIsLoading(false)
      })
  }, [props.match.params.jobId]);

  return (
    <div id="root-wrapper">

      <section className="formHeaderContainer">
        <div className="resume__backButton">
          <button
            type="submit"
            className="backBtn"
            onClick={() => props.history.push("/resume")}>
            <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToResume" alt="back" />
          </button>
        </div>
        <div className="editJobHistoryHeader">
          <div className="jobHistory__header">
            <h2>Edit Work History</h2>
          </div>
        </div>
      </section>
      <section className="editWorkHistory">
        <form className="editProfileForm">
          <fieldset className="editJobDetails">

            <label
              className="editLabel"
              htmlFor="jobTitle">
              Job Title <span className="asterisk">*</span>
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
              htmlFor="company">
              Company <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="company"
              value={job.company}
            />

            <div className="dateFields">
              <div className="start1">
                <label
                  className="editLabel"
                  htmlFor="startMonth">
                  Start Month <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="startMonth"
                  value={job.startMonth}
                />
              </div>
              <div className="start2">
                <label
                  className="editLabel"
                  htmlFor="startYear">
                  Start Year <span className="asterisk">*</span>
                </label>
                <input
                  type="number"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="startYear"
                  value={job.startYear}
                />
              </div>
            </div>

            <div className="dateFields" id="endDateFields">
              <div className="end1">
                <label
                  className="editLabel"
                  htmlFor="endMonth">
                  End Month
                </label>
                <input
                  type="text"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="endMonth"
                  value={job.endMonth}
                />
              </div>
              <div className="end2">
                <label
                  className="editLabel"
                  htmlFor="endYear">
                  End year
                </label>
                <input
                  type="number"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="endYear"
                  value={job.endYear}
                />
              </div>
            </div>

            <input
              type="checkbox"
              className="editInputs"
              onChange={checkBoxValue}
              checked={isChecked}
              id="current"
              value={job.current}
            />
            <label
              className="editLabel"
              htmlFor="current">
              I am currently employed here.
            </label>
            <br />
            <br />

            <label
              className="editLabel"
              htmlFor="description">
              Job Description <span className="asterisk">*</span>
            </label>
            <textarea
              type="text"
              required
              className="editInputTextarea"
              onChange={handleFieldChange}
              id="description"
              value={job.description}
            />

          </fieldset>
        </form>
      </section>
      <div className="saveEditChanges">
        <button
          type="button"
          className="blueBtn__wide"
          id="submitBtn"
          disabled={isLoading}
          onClick={updateJob}>
          Save Changes
        </button>
      </div>
      <br />
      <br />
      <br />
    </div>
  )
};

export default WorkHistoryEdit