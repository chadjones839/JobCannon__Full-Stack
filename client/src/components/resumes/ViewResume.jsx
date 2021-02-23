/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../nav/Navbar.jsx"
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";
import { useHistory, useParams } from "react-router-dom";
import WorkHistoryCard from "../resumes/WorkHistoryCard";
import SchoolsCard from "../resumes/SchoolsCard";

/*END IMPORTS*****************************************************************/

const ViewResume = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { id } = useParams();
  const { user, getLocalUser } = useContext(UserProfileContext);
  const { workHistories, 
          schools, 
          getWorkHistoryByUserId, 
          getSchoolsByUserId } = useContext(ResumeContext);

  useEffect(() => {
    getLocalUser(id)
    getWorkHistoryByUserId(id)
    getSchoolsByUserId(id)
  }, []);

  if (!user || !user.candidate) {
  return null
}

  return (
    <div id="root-wrapper">
      <div className="userResumeContainer">
        <section className="profileHeader">
          <div className="backBtnContainer">

          </div>
          <div className="userProfile__image">
            <div className="userImage__container">
              <img src={user.imageUrl} alt={user.candidate.firstName} />
            </div>
          </div>
          <div className="userProfile__right">
          </div>
        </section>
        <section className="userProfile__details">
          <div className="userProfile__name">
            <h2>{user.candidate.firstName} {user.candidate.lastName}</h2>
          </div>
          <div className="userProfile__location">
            {user.candidate.jobTitle}
          </div>
        </section>
        <main className="resumeContainer">
          <h2 className="viewSectionTitle"><span>Work History</span></h2>
          <section className="workHistory">
            {workHistories.map(job =>
              <WorkHistoryCard
                key={job.id}
                job={job} />
            )}
          </section>
          <h2 className="viewSectionTitle"><span>Skills</span></h2>
          <article className="skillSet">
            {/* <div className="viewSkillList">
              <span>{skill.skill1}</span>
              <span>{skill.skill2}</span>
              <span>{skill.skill3}</span>
              <span>{skill.skill4}</span>
              <span>{skill.skill5}</span>
              <span>{skill.skill6}</span>
              <span>{skill.skill7}</span>
              <span>{skill.skill8}</span>
              <span>{skill.skill9}</span>
              <span>{skill.skill10}</span>
            </div> */}
          </article>
          <h2 className="viewSectionTitle"><span>Schools</span></h2>
          <section className="schools">
            {schools.map(school =>
              <SchoolsCard
                key={school.id}
                school={school}
                {...props} />
            )}
          </section>
        </main>
        <br />
        <br />
      </div>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  )
}

export default ViewResume