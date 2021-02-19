import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { JobContext } from "../../providers/JobProvider.jsx";


const JobForm = () => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const currentTimeStamp = new Date().getTime();
  console.log(currentTimeStamp)
  const history = useHistory();
  const { addJob } = useContext(JobContext);
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState({
    employerId: sessionUser.id,
    postDate: currentTimeStamp,
    jobTitle: "",
    location: "",
    salary: "",
    rate: "",
    requirements: "",
    jobSummary: "",
    type: "",
    keyword1: "",
    keyword2: "",
    keyword3: ""
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...job };
    stateToChange[evt.target.id] = evt.target.value;
    setJob(stateToChange);
  };

  const createListing = evt => {
    evt.preventDefault();
    if (job.jobTitle === "" || job.type === "" || job.location === "" || job.salaryActual === "" || job.rate === "" || job.requirements === "" || job.jobSummary === "") {
      window.alert("Hold up boss, you're missing a field or two!");
    } else {
      setIsLoading(true);
      debugger
      addJob(job)
      history.push("/jobs");
    }
  };

  return (
    <div id="root-wrapper">

      <div className="listingHeader">
        <div className="jobListing__header">
          <h2>New Job Listing</h2>
        </div>
      </div>
      <section className="editJobListing">
        <form className="editProfileForm">
          <fieldset className="editJobDetails">

            <label
              className="editLabel"
              htmlFor="jobTitle">
              Job Title *
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="jobTitle"
            />

            <label
              className="editLabel"
              htmlFor="type">
              Type *
            </label>
            <select
              type="text"
              className="editInput"
              onChange={handleFieldChange}
              id="type"
            >
              <option selected disabled hidden></option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Temp">Temp</option>
            </select>

            <label
              className="editLabel"
              htmlFor="location">
              Job Location *
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="location"
            />

            <div className="salaryFields">
              <div className="salaryEdit">
                <label
                  className="editLabel"
                  htmlFor="salary">
                  Salary
                </label>
                <input
                  type="text"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="salary"
                />
              </div>
              <div className="rateEdit">
                <label
                  className="editLabel"
                  htmlFor="rate">
                  Rate
                </label>
                <select
                  type="text"
                  className="editInputRate"
                  onChange={handleFieldChange}
                  id="rate"
                >
                  <option selected disabled hidden></option>
                  <option value="Annually">Sal</option>
                  <option value="Hourly">Hr</option>
                </select>
              </div>
            </div>

            <label
              className="editLabel"
              htmlFor="requirements">
              Requirements
            </label>
            <textarea
              type="text"
              className="editInputTextarea"
              onChange={handleFieldChange}
              id="requirements"
            />

            <label
              className="editLabel"
              htmlFor="jobSummary">
              Job Summary *
            </label>
            <textarea
              type="text"
              required
              className="editInputTextarea"
              onChange={handleFieldChange}
              id="jobSummary"
            />

            <label className="editLabel">3 Keywords that describe the job:</label>
            <div className="keywords">
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword1"
              />
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword2"
              />
              <input
                type="text"
                className="editInput"
                onChange={handleFieldChange}
                id="keyword3"
              />
            </div>

          </fieldset>
        </form>
      </section>
      <div className="saveEditChanges">
        <button
          type="button"
          className="blueBtn90"
          id="submitBtn"
          disabled={isLoading}
          onClick={createListing}>
          Post
        </button>
      </div>
      <br />
    </div>
  )
};

export default JobForm