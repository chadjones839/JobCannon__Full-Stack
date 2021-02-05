const remoteURL = "http://localhost:5002"

export default {
  getUser(id) {
    return fetch(`${remoteURL}/users/${id}`)
      .then(result => result.json())
  },
  getAllUsers() {
    return fetch(`${remoteURL}/users`)
      .then(result => result.json())
  },
  getWithChats(id) {
    return fetch(`${remoteURL}/users/${id}?_embed=chats`)
      .then(result => result.json())
  },
  getWithFriends() {
    return fetch(`${remoteURL}/users?_embed=friends`)
      .then(result => result.json())
  },
  deleteUser(userId) {
    return fetch(`${remoteURL}/users/${userId}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  postUser(newUser) {
      return fetch(`${remoteURL}/users`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
      }).then(result=>result.json())
  },
  getRandomId() {
    return fetch(`${remoteURL}/users`)
      .then(result => result.json())
      .then(users => {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        return randomUser.id;
    });
  }
}