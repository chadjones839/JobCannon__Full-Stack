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

const ViewResume = props => {

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
    if (sessionUser.accountType === "candidate") {
      return UserManager.getUser(sessionUser.id)
    }
    else {
      return UserManager.getUser(props.match.params.userId)
    }
  }

  const getJobs = () => {
    if (sessionUser.accountType === "candidate") {
      return ResumeManager.getJobsForUser(sessionUser.id)
    }
    else {
      return ResumeManager.getJobsForUser(props.match.params.userId)
    }
  }

  const getSkills = () => {
    if (sessionUser.accountType === "candidate") {
      return ResumeManager.getSkillsForUser(sessionUser.id)
    }
    else {
      return ResumeManager.getSkillsForUser(props.match.params.userId)
    }
  }

  const getSchools = () => {
    if (sessionUser.accountType === "candidate") {
      return ResumeManager.getSchoolsForUser(sessionUser.id)
    }
    else {
      return ResumeManager.getSchoolsForUser(props.match.params.userId)
    }
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
          <div className="backBtnContainer">

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
          <h2 className="viewSectionTitle"><span>Work History</span></h2>
          <section className="workHistory">
            {jobs.map(job =>
              <WorkHistoryCard
                key={job.id}
                job={job}
                {...props} />
            )}
          </section>
          <h2 className="viewSectionTitle"><span>Skills</span></h2>
          <article className="skillSet">
            <div className="viewSkillList">
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