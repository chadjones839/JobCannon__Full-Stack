import React from 'react';

const SkillCard = props => {

  return (
    <React.Fragment>
      <section className="experienceCard">
        <h2>{props.skill.skill1}</h2>
        <h2>{props.skill.skill2}</h2>
        <h2>{props.skill.skill3}</h2>
        <h2>{props.skill.skill4}</h2>
        <h2>{props.skill.skill5}</h2>
      </section>
    </React.Fragment>
  )   
};

export default SkillCard