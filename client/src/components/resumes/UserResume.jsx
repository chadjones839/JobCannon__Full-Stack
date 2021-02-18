/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import Navbar from "../nav/Navbar.jsx"
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { ResumeContext } from "../../providers/ResumeProvider.jsx";
import { useHistory } from "react-router-dom";
import WorkHistoryCard from "../resumes/WorkHistoryCard";
import SchoolsCard from "../resumes/SchoolsCard";

/*END IMPORTS*****************************************************************/

const UserResume = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const userId = sessionUser.id;
  const history = useHistory();
  const { user, getLocalUser } = useContext(UserProfileContext)
  const { workHistories, 
          schools, 
          getWorkHistoryByUserId, 
          getSchoolsByUserId } = useContext(ResumeContext)


  useEffect(() => {
    getLocalUser(userId)
    getWorkHistoryByUserId(userId)
    getSchoolsByUserId(userId)
  }, []);

  if (!user || !user.candidate) {
    return null
  }

  console.log(user)
  return (
    <div id="root-wrapper">
      <div className="userResumeContainer">
        <section className="profileHeader">
          <div className="logoutButton">

          </div>
          <div className="userProfile__image">
            <div className="userImage__container">
              <img src={user.imageUrl} alt={user.firstName} />
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
          <section className="editProfileButton">
            <div className="editBtnContainer">
              <button
                onClick={() => history.push(`/user-resume/${user.id}`)}
                className="blackBtn__wide"
                type="button"
              >
                View Resume
                </button>
            </div>
          </section>

          <h2 className="sectionTitle">Work History</h2>
          <section className="workHistory">

            <div className="addWorkHistory">
              <button
                onClick={() => history.push(`/work-history/new`)}
                className="addButton"
                type="button"
              >
                + Add Job
                </button>
            </div>

            {workHistories.map(job =>
              <WorkHistoryCard
                key={job.id}
                job={job} />
            )}
          </section>

          <h2 className="sectionTitle">Skills</h2>
          <section className="skills">
            {/* {(skill.userId !== sessionUser.id)
              ? <div className="addSkills">
                <button
                  onClick={() => history.push(`/skills/new`)}
                  className="addButton"
                  type="button"
                >
                  + Add Skills
                  </button>
              </div>
              : <><div className="editSkills">
                <button
                  onClick={() => history.push(`/skills/${skill.id}/edit`)}
                  className="addButton"
                  type="button"
                >
                  Edit Skills
                </button>
              </div>
                <article className="skillSet">
                  <div className="skillList">
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
                  </div>
                </article></>} */}
          </section>

          <h2 className="sectionTitle">Schools</h2>
          <section className="schools">

            <div className="addWorkHistory">
              <button
                onClick={() => history.push(`/schools/new`)}
                className="addButton"
                type="button"
              >
                + Add School
                </button>
            </div>
            {schools.map(school =>
              <SchoolsCard
                key={school.id}
                school={school} />
            )}
          </section>
        </main>
        <br/>
        <br/>
      </div>
      <div className="navpanel">
        <Navbar />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
};

export default UserResume;