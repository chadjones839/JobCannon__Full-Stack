import React, { useState, useEffect } from 'react';
import ResumeManager from '../modules/ResumeManager';

const SkillsEdit = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false);
  const [skill, setSkill] = useState({
    userId: sessionUser.id,
    skill1: "",
    skill2: "",
    skill3: "",
    skill4: "",
    skill5: "",
    skill6: "",
    skill7: "",
    skill8: "",
    skill9: "",
    skill10: ""
  });
  const handleFieldChange = evt => {
    const stateToChange = { ...skill };
    stateToChange[evt.target.id] = evt.target.value;
    setSkill(stateToChange);
  };

  const updateSkills = evt => {
    evt.preventDefault();
    setIsLoading(true);
    const editedSkill = {
      userId: sessionUser.id,
      skill1: skill.skill1,
      skill2: skill.skill2,
      skill3: skill.skill3,
      skill4: skill.skill4,
      skill5: skill.skill5,
      skill6: skill.skill6,
      skill7: skill.skill7,
      skill8: skill.skill8,
      skill9: skill.skill9,
      skill10: skill.skill10,
      id: props.match.params.skillId
    };

    ResumeManager.editSkill(editedSkill)
      .then(() => props.history.push("/resume"));
  };

  useEffect(() => {
    ResumeManager.getSkill(props.match.params.skillId)
      .then((skill) => {
        setSkill(skill)
        setIsLoading(false)
      })
  }, [props.match.params.skillId]);

  return (
    <div id="root-wrapper">
      <section className="skillFormHeaderContainer">
        <div className="skill__backButton">
          <button
            type="submit"
            className="backBtn"
            onClick={() => props.history.push("/resume")}>
            <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToResume" alt="back" />
          </button>
        </div>
        <div className="addSkillHeader">
          <div className="jobHistory__header">
            <h2>Add Skills</h2>
          </div>
        </div>
      </section>
      <section className="skillsContainer">
        <form className="editProfileForm">
          <fieldset className="editJobDetails">

            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="skill1"
              value={skill.skill1}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill2"
              value={skill.skill2}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill3"
              value={skill.skill3}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill4"
              value={skill.skill4}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill5"
              value={skill.skill5}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill6"
              value={skill.skill6}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill7"
              value={skill.skill7}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill8"
              value={skill.skill8}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill9"
              value={skill.skill9}
            />
            <input
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="skill10"
              value={skill.skill10}
            />
          </fieldset>
          <br/>
          <br/>
          <br/>
        </form>
      </section>
      <div className="saveEditChanges">
        <button
          type="button"
          className="blueBtn__wide"
          id="submitBtn"
          disabled={isLoading}
          onClick={updateSkills}>
          Save Changes
        </button>
      </div>
    </div>
  )
};

export default SkillsEdit