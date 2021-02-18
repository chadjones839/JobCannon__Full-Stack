import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";

const WorkHistoryEdit = () => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { id } = useParams();
  const { workHistory, updateWorkHistory, getWorkHistoryById } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [job, setJob] = useState({
    userId: sessionUser.id,
    jobTitle: "",
    company: "",
    location: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: isChecked,
    description: ""
  });

  const checkBoxValue = e => {
    if (!isChecked) {
      job.current = true
      job.endMonth = null
      job.endYear = null
      document.querySelector("#endDateFields").style.display = "none"
      setIsChecked(true);
    }
    else {
      job.current = false
      document.querySelector("#endDateFields").style.display = "flex"
      setIsChecked(false)
    }
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...job };
    stateToChange[evt.target.id] = evt.target.value;
    setJob(stateToChange);
  };

  const updateJob = e => {
    e.preventDefault();
    setIsLoading(true)

    updateWorkHistory({
      id: id,
      userId: sessionUser.id,
      jobTitle: job.jobTitle,
      company: job.company,
      location: job.location,
      startMonth: job.startMonth,
      startYear: job.startYear,
      endMonth: job.endMonth,
      endYear: job.endYear,
      current: job.current,
      description: job.description
    })

    updateWorkHistory(job.id, job)
    history.push("/resume")
  }

  useEffect(() => {
    getWorkHistoryById(id)
  }, [id]);

  useEffect(() => {
    setJob(workHistory)
  }, [workHistory]);

  return (
    <div id="root-wrapper">

      <section className="formHeaderContainer">
        <div className="resume__backButton">
          <button
            type="submit"
            className="backBtn"
            onClick={() => history.push("/resume")}>
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
              defaultValue={job.jobTitle}
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
              defaultValue={job.company}
            />

            <label
              className="editLabel"
              htmlFor="location">
              Location <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="location"
              defaultValue={job.location}
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
                  defaultValue={job.startMonth}
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
                  defaultValue={job.startYear}
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
                  defaultValue={job.endMonth}
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
                  defaultValue={job.endYear}
                />
              </div>
            </div>

            <input
              type="checkbox"
              className="editInputs"
              onChange={checkBoxValue}
              checked={isChecked}
              id="current"
              defaultValue={job.current}
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
              defaultValue={job.description}
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