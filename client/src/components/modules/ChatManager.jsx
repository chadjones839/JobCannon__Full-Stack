const remoteURL = "http://localhost:5002";

export default {

  getChat(id) {
      return fetch(`${remoteURL}/chats/${id}`).then(result=>result.json())
  },
  getAllChats() {
      return fetch(`${remoteURL}/chats`).then(result => result.json())
  },
  postChat(newChat) {
      return fetch(`${remoteURL}/chats`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newChat)
      }).then(result=>result.json())
  },
  getWithUsers() {
    return fetch(`${remoteURL}/chats?_expand=user`)
        .then(result => result.json())
  },
  getWithMessages() {
    return fetch(`${remoteURL}/chats?_embed=messages`)
        .then(result => result.json())
  },
  deleteChat(id) {
    return fetch(`${remoteURL}/chats/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  }
}
