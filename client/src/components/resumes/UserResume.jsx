/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from "../nav/Navbar.jsx"
import UserManager from "../modules/UserManager";
import ResumeManager from "../modules/ResumeManager";
import WorkHistoryCard from "../resumes/WorkHistoryCard";
import SchoolsCard from "../resumes/SchoolsCard";

/*END IMPORTS*****************************************************************/

const UserResume = props => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [user, setUser] = useState({})
  const [jobs, setJobs] = useState([])
  const [skills, setSkills] = useState([])
  const [schools, setSchools] = useState([])
  let skill = {}

  skills.find(obj => {
    skill = obj
    return obj
  });

  const getUser = () => {
    return UserManager.getUser(sessionUser.id)
  }

  const getJobs = () => {
    return ResumeManager.getJobsForUser(sessionUser.id)
  }

  const getSkills = () => {
    return ResumeManager.getSkillsForUser(sessionUser.id)
  }

  const getSchools = () => {
    return ResumeManager.getSchoolsForUser(sessionUser.id)
  }

  useEffect(() => {
    getUser()
      .then((userResponse) => {
        getJobs()
          .then((jobsResponse) => {
            getSkills()
              .then((skillsResponse) => {
                getSchools()
                  .then((schoolResponse) => {
                    setSkills(skillsResponse)
                    setUser(userResponse)
                    setJobs(jobsResponse)
                    setSchools(schoolResponse)
                  })
              })
          })
      });
  }, []);

  return (
    <div id="root-wrapper">
      <div className="userResumeContainer">
        <section className="profileHeader">
          <div className="logoutButton">

          </div>
          <div className="userProfile__image">
            <div className="userImage__container">
              <img src={user.image} alt={user.firstName} />
            </div>
          </div>
          <div className="userProfile__right">
          </div>
        </section>
        <section className="userProfile__details">
          <div className="userProfile__name">
            <h2>{user.firstName} {user.lastName}</h2>
          </div>
          <div className="userProfile__location">
            {user.jobTitle}
          </div>
        </section>
        <main className="resumeContainer">
          <section className="editProfileButton">
            <div className="editBtnContainer">
              <button
                onClick={() => props.history.push(`/user-resume/${user.id}`)}
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
                onClick={() => props.history.push(`/work-history/new`)}
                className="addButton"
                type="button"
              >
                + Add Job
                </button>
            </div>

            {jobs.map(job =>
              <WorkHistoryCard
                key={job.id}
                job={job}
                {...props} />
            )}
          </section>

          <h2 className="sectionTitle">Skills</h2>
          <section className="skills">
            {(skill.userId !== sessionUser.id)
              ? <div className="addSkills">
                <button
                  onClick={() => props.history.push(`/skills/new`)}
                  className="addButton"
                  type="button"
                >
                  + Add Skills
                  </button>
              </div>
              : <><div className="editSkills">
                <button
                  onClick={() => props.history.push(`/skills/${skill.id}/edit`)}
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
                </article></>}
          </section>

          <h2 className="sectionTitle">Schools</h2>
          <section className="schools">

            <div className="addWorkHistory">
              <button
                onClick={() => props.history.push(`/schools/new`)}
                className="addButton"
                type="button"
              >
                + Add School
                </button>
            </div>
            {schools.map(school =>
              <SchoolsCard
                key={school.id}
                school={school}
                {...props} />
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