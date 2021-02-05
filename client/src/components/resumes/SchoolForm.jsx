import React, { useState } from 'react';
import ResumeManager from '../modules/ResumeManager';

const SchoolForm = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [school, setSchool] = useState({
    userId: sessionUser.id,
    schoolName: "",
    field: "",
    degree: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: isChecked
  });

  const checkBoxValue = evt => {
    if (!isChecked) {
      school.current = true
      school.endMonth = ""
      school.endYear = ""
      document.querySelector("#endDateFields").style.display = "none"
      setIsChecked(true);
    }
    else {
      school.current = false
      document.querySelector("#endDateFields").style.display = "flex"
      setIsChecked(false)
    }
  }


  const handleFieldChange = evt => {
    const stateToChange = { ...school };
    stateToChange[evt.target.id] = evt.target.value;
    setSchool(stateToChange);
  };

  const createSchool = evt => {
    evt.preventDefault();
    if (school.schoolName === "" || school.startMonth === "" || school.startYear === "") {
      window.alert("Hold up boss, you're missing a field or two!");
    } else {
      setIsLoading(true);
      ResumeManager.postSchool(school)
        .then(() => props.history.push("/resume"));
    }
  };

  return (
    <div id="root-wrapper">

      <div className="resume__backButton">
        <button
          type="submit"
          className="backBtn"
          onClick={() => props.history.push("/resume")}>
          <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToResume" alt="back" />
        </button>
      </div>

      <div className="addSchoolHeader">
        <div className="schoolForm__header">
          <h2>Add School</h2>
        </div>
      </div>

      <section className="createSchool">
        <form className="editProfileForm">
          <fieldset className="editJobDetails">

            <label
              className="editLabel"
              htmlFor="schoolName">
              School Name <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="schoolName"
            />

            <label
              className="editLabel"
              htmlFor="degree">
              Degree
            </label>
            <input
              type="text"
              className="editInput"
              placeholder="ex. B.S."
              onChange={handleFieldChange}
              id="degree" />

            <label
              className="editLabel"
              htmlFor="field">
              Area of Study
            </label>
            <input
              type="text"
              className="editInput"
              placeholder="ex. Bird Law"
              onChange={handleFieldChange}
              id="field"
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

            <div className="schoolDateFields" id="endDateFields">
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
              className="editCheckbox"
              onChange={checkBoxValue}
              checked={isChecked}
              id="current"
            />
            <label
              className="editCheckboxLabel"
              htmlFor="current">
              I am currently a student here.
            </label>
            <br />
            <br />

          </fieldset>
        </form>
      </section>
      <div className="saveEditChanges">
        <button
          type="button"
          className="blueBtn__wide"
          id="submitBtn"
          disabled={isLoading}
          onClick={createSchool}>
          Save
        </button>
      </div>
    </div>
  )
};

export default SchoolForm