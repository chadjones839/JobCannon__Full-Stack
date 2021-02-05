const remoteURL = "http://localhost:5002"

export default {
  getJob(id) {
    return fetch(`${remoteURL}/jobs/${id}`)
      .then(result => result.json())
  },
  getAllJobs() {
    return fetch(`${remoteURL}/jobs`)
      .then(result => result.json())
  },
  getWithUser(id) {
    return fetch(`${remoteURL}/jobs?userId=${id}&_expand=user`)
      .then(result => result.json())
  },
  editJob(user) {
    return fetch(`${remoteURL}/jobs/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(data => data.json());  
    },
  deleteJob(id) {
    return fetch(`${remoteURL}/jobs/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  postJob(newUser) {
      return fetch(`${remoteURL}/jobs`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
      }).then(result=>result.json())
  }
}

