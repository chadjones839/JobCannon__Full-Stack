/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider.jsx";
import { EmployerContext } from "../../providers/EmployerProvider.jsx";
import { Link } from "react-router-dom";
import Navbar from "../nav/Navbar.jsx";

const EditEmployer = props => {

  const history = useHistory();
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { id } = useParams();
  const { user, getLocalUser, updateUser } = useContext(UserProfileContext);
  const { employer, getEmployerById, updateEmployer } = useContext(EmployerContext);

  const [image, setImage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocalUser(id)
  }, [id]);

  const [editedUser, setEditedUser] = useState({
    id: id,
    email: "",
    imageUrl: "",
    bio: "",
    firebaseUserId: user.firebaseUserId,
    candidateId: user.candidateId,
    employerId: user.employerId
  })
  
  const [editedEmployer, setEditedEmployer] = useState({
    id: employer.employerId,
    name: "",
    location: "",
    industry: ""
  })
  
  
  useEffect(() => {
    setEditedUser(user)
  }, [user]);

  useEffect(() => {
    getEmployerById(sessionUser.employerId)
  }, [sessionUser.employerId]);

  useEffect(() => {
    setEditedEmployer(employer)
  }, [employer]);

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'jobcannon')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dhduglm4j/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
    user.image = file.secure_url
  }

  const handleUserFieldChange = e => {
    const stateToChange = { ...editedUser };
    stateToChange[e.target.id] = e.target.value;
    setEditedUser(stateToChange);
  };

  const handleEmployerFieldChange = e => {
    const stateToChange = { ...editedEmployer };
    stateToChange[e.target.id] = e.target.value;
    setEditedEmployer(stateToChange);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    updateUser({
      id: id,
      email: editedUser.email,
      imageUrl: editedUser.imageUrl,
      bio: editedUser.bio,
      firebaseUserId: editedUser.firebaseUserId,
      candidateId: editedUser.candidateId,
      employerId: editedUser.employerId
    })

    updateEmployer({
    id: user.employerId,
    name: editedEmployer.name,
    location: editedEmployer.location,
    industry: editedEmployer.industry
    })

    updateUser(id, editedUser)
    .then(() => {
      updateEmployer(user.employerId, editedEmployer)
      .then(() =>{
        history.push("/profile")
      })
    })
  }

  if (!user || !employer) {
    return null
  }

  

  return (
    <div id="root-wrapper">
      <main className="profileContainer">
        <section className="profileHeader">
          <div className="logoutButton">
            <Link className="nav-link" to="/profile">
              <button type="submit" className="backbutton">
                <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" alt="back" />
              </button>
            </Link>
          </div>
          <div className="userProfile__image">
            <div className="userImage__container">
              <img src={user.imageUrl} alt="logo" />
            </div>
          </div>
          <div className="userProfile__right">
          </div>
        </section>
        <section className="userProfile__details">
          <div className="userProfile__name">
            <h2>{employer.name}</h2>
          </div>
          <div className="userProfile__location">
            {employer.location}
          </div>
        </section>
        <section className="editProfileButton">
          <div className="editBtnContainer">
            <button
              type="button"
              className="blueBtn90"
              id="submitBtn"
              disabled={isLoading}
              onClick={updateProfile}>
              Save Changes
              </button>
          </div>
        </section>
        <form className="editProfileForm">
          <fieldset>

            <div className="imageUpload">
              <div className="imageUploadInput">
                <label
                  className="editLabel"
                  htmlFor="uploadImage">
                  Upload Profile Image
                  </label>
                <input
                  type="file"
                  className="editInput"
                  onChange={uploadImage}
                  id="uploadImage"
                />
              </div>
              <div className="imageUploadField">
                {loading ? (
                  <div className="imageLoading">
                    <h4 className="imageLoading">loading...</h4>
                  </div>
                ) : (
                    <div className="uploadComplete">
                      <img src={image} style={{ width: '50px' }} />
                    </div>
                  )}
              </div>
            </div>

            <h3 className="editProfileHeader">Profile Details</h3>
            <label
              className="editLabel"
              htmlFor="name">
              Company Name
              </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleEmployerFieldChange}
              id="name"
              defaultValue={employer.name}
            />

            <label
              className="editLabel"
              htmlFor="industry">
              Industry
              </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleEmployerFieldChange}
              id="industry"
              defaultValue={employer.industry}
            />

            <label
              className="editLabel"
              htmlFor="location">
              Location
              </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleEmployerFieldChange}
              id="location"
              defaultValue={employer.location}
            />

            <label
              className="editLabel"
              htmlFor="bio">
              Bio
              </label>
            <textarea
              type="text"
              required
              className="editInput"
              onChange={handleUserFieldChange}
              id="bio"
              defaultValue={user.bio}
            />


            <h3 className="editProfileHeader">Account Details</h3>

            <label
              className="editLabel"
              htmlFor="email">
              Email
              </label>
            <input
              type="email"
              required
              className="editInput"
              onChange={handleUserFieldChange}
              id="email"
              defaultValue={user.email}
            />

            <label
              className="editLabel"
              htmlFor="password">
              New Password
              </label>
            <input
              type="password"
              required
              className="editInput"
              // onChange={handleFieldChange}
              id="password"
              // defaultValue={user.password}
            />

            <label
              className="editLabel"
              htmlFor="passwordConfirm">
              Confirm New Password
              </label>
            <input
              type="password"
              required
              className="editInput"
              // onChange={handleFieldChange}
              id="passwordConfirm"
            />
          </fieldset>
        </form>
      </main>
      <div className="navpanel">
        <Navbar />
      </div>
    </div>
  )
}


export default EditEmployer;