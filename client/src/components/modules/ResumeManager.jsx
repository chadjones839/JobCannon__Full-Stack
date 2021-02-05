const remoteURL = "http://localhost:5002"

export default {
  getJob(id) {
    return fetch(`${remoteURL}/workHistory/${id}`)
      .then(result => result.json())
  },
  getAllJobs() {
    return fetch(`${remoteURL}/workHistory`)
      .then(result => result.json())
  },
  getJobsForUser(id) {
    return fetch(`${remoteURL}/workHistory?userId=${id}`)
      .then(result => result.json())
  },
  deleteJob(id) {
    return fetch(`${remoteURL}/workHistory/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  postJob(newUser) {
      return fetch(`${remoteURL}/workHistory`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
      }).then(result=>result.json())
  },
  editJob(editedJob) {
    return fetch(`${remoteURL}/workHistory/${editedJob.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedJob)
    }).then(data => data.json());  
  },


  getSkill(id) {
    return fetch(`${remoteURL}/skills/${id}`)
      .then(result => result.json())
  },
  getAllSkills() {
    return fetch(`${remoteURL}/skills`)
      .then(result => result.json())
  },
  getSkillsForUser(id) {
    return fetch(`${remoteURL}/skills?userId=${id}`)
      .then(result => result.json())
  },
  deleteSkill(userId) {
    return fetch(`${remoteURL}/skills/${userId}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  postSkill(newUser) {
      return fetch(`${remoteURL}/skills`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
      }).then(result=>result.json())
  },
  editSkill(editedSkill) {
    return fetch(`${remoteURL}/skills/${editedSkill.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedSkill)
    }).then(data => data.json());  
  },

  getSchool(id) {
    return fetch(`${remoteURL}/schools/${id}`)
      .then(result => result.json())
  },
  getAllSchools() {
    return fetch(`${remoteURL}/schools`)
      .then(result => result.json())
  },
  getSchoolsForUser(id) {
    return fetch(`${remoteURL}/schools?userId=${id}`)
      .then(result => result.json())
  },
  deleteSchool(userId) {
    return fetch(`${remoteURL}/schools/${userId}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  postSchool(newUser) {
      return fetch(`${remoteURL}/schools`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
      }).then(result=>result.json())
  },
  editSchool(editedSchool) {
    return fetch(`${remoteURL}/schools/${editedSchool.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedSchool)
    }).then(data => data.json());  
  }
}