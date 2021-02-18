import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";

const SchoolForm = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const history = useHistory();
  const { id } = useParams();
  const { school, updateSchool, getSchoolById } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editedSchool, setEditedSchool] = useState({
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

  const checkBoxValue = e => {
    if (!isChecked) {
      school.current = true
      school.endMonth = null
      school.endYear = null
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
    setEditedSchool(stateToChange);
  };

  const editSchool = event => {
    event.preventDefault();
    setIsLoading(true)

    updateSchool({
      userId: sessionUser.id,
      schoolName: editedSchool.schoolName,
      field: editedSchool.field,
      degree: editedSchool.degree,
      startMonth: editedSchool.startMonth,
      startYear: editedSchool.startYear,
      endMonth: editedSchool.endMonth,
      endYear: editedSchool.endYear,
      current: isChecked,
      id: id
    });

    updateSchool(editedSchool.id, editedSchool)
    history.push("/resume")
  }

  useEffect(() => {
    getSchoolById(id)
  }, [id]);

  useEffect(() => {
    setEditedSchool(school)
  }, [school]);

  return (
    <div id="root-wrapper">
      <div className="resume__backButton">
        <button
          type="submit"
          className="backBtn"
          onClick={() => history.push("/resume")}>
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
              defaultValue={school.schoolName}
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
              defaultValue={school.degree}
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
              defaultValue={school.field}
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
                  defaultValue={school.startMonth}>
                  <option defaultValue="January">January</option>
                  <option defaultValue="Febuary">Febuary</option>
                  <option defaultValue="March">March</option>
                  <option defaultValue="April">April</option>
                  <option defaultValue="May">May</option>
                  <option defaultValue="June">June</option>
                  <option defaultValue="July">July</option>
                  <option defaultValue="August">August</option>
                  <option defaultValue="September">September</option>
                  <option defaultValue="October">October</option>
                  <option defaultValue="November">November</option>
                  <option defaultValue="December">December</option>
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
                  defaultValue={school.startYear}
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
                  defaultValue={school.endMonth}>
                  <option defaultValue="January">January</option>
                  <option defaultValue="Febuary">Febuary</option>
                  <option defaultValue="March">March</option>
                  <option defaultValue="April">April</option>
                  <option defaultValue="May">May</option>
                  <option defaultValue="June">June</option>
                  <option defaultValue="July">July</option>
                  <option defaultValue="August">August</option>
                  <option defaultValue="September">September</option>
                  <option defaultValue="October">October</option>
                  <option defaultValue="November">November</option>
                  <option defaultValue="December">December</option>
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
                  defaultValue={school.endYear}
                />
              </div>
            </div>
            <input
              type="checkbox"
              className="editInputs"
              onChange={checkBoxValue}
              checked={isChecked}
              id="current"
              defaultValue={school.current}
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
          onClick={editSchool}>
          Save Changes
        </button>
      </div>
    </div>
  )
};

export default SchoolForm