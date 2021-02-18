import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";

const WorkHistory = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { addWorkHistory } = useContext(ResumeContext)
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
    description: "",
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
  }

  console.log(isChecked)

  const handleFieldChange = evt => {
    const stateToChange = { ...job };
    stateToChange[evt.target.id] = evt.target.value;
    setJob(stateToChange);
  };

  const createJob = evt => {
    evt.preventDefault();
    if (job.jobTitle === "" || job.company === "" || job.startMonth === "" || job.startYear === "" || job.description === "") {
      window.alert("Hold up boss, you're missing a field or two!");
    } else {
      setIsLoading(true);
      debugger
      addWorkHistory(job)
      history.push("/resume");
    }
  };

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
        <div className="addJobHistoryHeader">
          <div className="jobHistory__header">
            <h2>Add Work History</h2>
          </div>
        </div>
      </section>
      <section className="createWorkHistory">
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
            />

            <div className="dateFields">
              <div className="start1">
                <label
                  className="editLabel"
                  htmlFor="startMonth">
                  Start Month <span className="asterisk">*</span>
                </label>
                <select
                  type="text"
                  className="editSelect"
                  onChange={handleFieldChange}
                  id="startMonth">
                  <option selected disabled hidden>- Select -</option>
                  <option value="January">January</option>
                  <option value="Febuary">Febuary</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
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
                  placeholder="4-digit"
                  min="1930"
                  max="2020"
                  onChange={handleFieldChange}
                  id="startYear"
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
                <select
                  type="text"
                  className="editSelect"
                  onChange={handleFieldChange}
                  id="endMonth">
                  <option selected disabled hidden>- Select -</option>
                  <option value="January">January</option>
                  <option value="Febuary">Febuary</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
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
                  placeholder="4-digit"
                  min="1930"
                  max="2035"
                  onChange={handleFieldChange}
                  id="endYear"
                />
              </div>
            </div>

            <input
              type="checkbox"
              className="editInputs"
              onChange={checkBoxValue}
              checked={isChecked}

              id="current"
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
          onClick={createJob}>
          Save
        </button>
      </div>
      <br />
      <br />
      <br />
    </div>
  )
};

export default WorkHistory