import React, { useState, useEffect } from 'react';
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

  const updateSchool = event => {
    event.preventDefault();
    setIsLoading(true)

    const editedSchool = {
      userId: sessionUser.id,
      schoolName: school.schoolName,
      field: school.field,
      degree: school.degree,
      startMonth: school.startMonth,
      startYear: school.startYear,
      endMonth: school.endMonth,
      endYear: school.endYear,
      current: isChecked,
      id: props.match.params.schoolId
    }

    ResumeManager.editSchool(editedSchool)
      .then(() => {
        props.history.push("/resume")
      })
  }

  useEffect(() => {
    ResumeManager.getSchool(props.match.params.schoolId)
      .then((school) => {
        setSchool(school)
        setIsLoading(false)
      })
  }, [props.match.params.schoolId]);

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

      <div className="editSchoolHeader">
        <div className="schoolForm__header">
          <h2>Edit School</h2>
        </div>
      </div>

      <section className="editSchool">
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
              value={school.schoolName}
            />

            <label
              className="editLabel"
              htmlFor="schoolName">
              School Name <span className="asterisk">*</span>
            </label>
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="degree"
              value={school.degree}
            />

            <label
              className="editLabel"
              htmlFor="field">
              Area of Study
            </label>
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="field"
              value={school.field}
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
                  max-length="9"
                  onChange={handleFieldChange}
                  id="startMonth"
                  value={school.startMonth}>
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
                  value={school.startYear}
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
                  max-length="9"
                  onChange={handleFieldChange}
                  id="endMonth"
                  value={school.endMonth}>
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
                  value={school.endYear}
                />
              </div>
            </div>
            <input
              type="checkbox"
              className="editInputs"
              onChange={checkBoxValue}
              checked={isChecked}
              id="current"
              value={school.current}
            />
            <label
              className="editLabel"
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
          onClick={updateSchool}>
          Save Changes
        </button>
      </div>
    </div>
  )
};

export default SchoolForm