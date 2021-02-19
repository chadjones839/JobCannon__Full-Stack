import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { JobContext } from "../../providers/JobProvider.jsx";
import classNames from 'classnames'


const JobForm = () => {

  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const currentTimeStamp = new Date().getTime();
  const history = useHistory();
  const { addJob } = useContext(JobContext);
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState({
    employerId: sessionUser.employerId,
    postDate: currentTimeStamp,
    jobTitle: "",
    jobLocation: "",
    salary: "",
    rate: "",
    requirements: "",
    jobSummary: "",
    type: "",
    keyword1: "",
    keyword2: "",
    keyword3: ""
  });

  const handleFieldChange = e => {
    const stateToChange = { ...job };
    console.log(e)
    stateToChange[e.target.id] = e.target.value;
    setJob(stateToChange);
  };

  const handleNameChange = e => {
    const stateToChange = { ...job };
    console.log(e)
    stateToChange[e.target.id] = e.target.value;
    setJob(stateToChange);
  };

  
  

  const fullTimeActive = e => {
    const stateToChange = { ...job };
    stateToChange[e.target.name] = e.target.value;
    setJob(stateToChange);
    const fullTime = document.getElementById("fullTime");
    const partTime = document.getElementById("partTime");
    const temp = document.getElementById("temp");
    fullTime.classList.add("selected");
    partTime.classList.remove("selected");
    temp.classList.remove("selected")
  }

  const partTimeActive = e => {
    const stateToChange = { ...job };
    stateToChange[e.target.name] = e.target.value;
    setJob(stateToChange);
    const fullTime = document.getElementById("fullTime");
    const partTime = document.getElementById("partTime");
    const temp = document.getElementById("temp");
    fullTime.classList.remove("selected");
    partTime.classList.add("selected");
    temp.classList.remove("selected")
  }

  const tempActive = e => {
    const stateToChange = { ...job };
    stateToChange[e.target.name] = e.target.value;
    setJob(stateToChange);
    const fullTime = document.getElementById("fullTime");
    const partTime = document.getElementById("partTime");
    const temp = document.getElementById("temp");
    fullTime.classList.remove("selected");
    partTime.classList.remove("selected");
    temp.classList.add("selected")
  }

  const salRateActive = e => {
    const stateToChange = { ...job };
    stateToChange[e.target.name] = e.target.value;
    setJob(stateToChange);
    const salRate = document.getElementById("salRate");
    const hrRate = document.getElementById("hrRate");
    salRate.classList.add("selected");
    hrRate.classList.remove("selected")
  }

  const hrRateActive = e => {
    const stateToChange = { ...job };
    stateToChange[e.target.name] = e.target.value;
    setJob(stateToChange);
    const salRate = document.getElementById("salRate");
    const hrRate = document.getElementById("hrRate");
    salRate.classList.remove("selected");
    hrRate.classList.add("selected")
  }


  // $('button').on('click', function(){
  //   $('button').removeClass('selected');
  //   $(this).addClass('selected');
  // });

  console.log(job.rate)
  
  

  const createListing = evt => {
    evt.preventDefault();
    if (job.jobTitle === "" || job.type === "" || job.location === "" || job.salaryActual === "" || job.rate === "" || job.requirements === "" || job.jobSummary === "") {
      window.alert("Hold up boss, you're missing a field or two!");
    } else {
      setIsLoading(true);
      addJob(job)
      history.push("/jobs");
    }
  };

  return (
    <div id="root-wrapper">

      <div className="listingHeader">
        <div className="job__backButton">
          <button
            type="submit"
            className="slimBackBtn"
            onClick={() => history.push("/resume")}>
            <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToResume" alt="back" />
          </button>
        </div>
        <div className="jobListing__header">
          <h2>New Job Listing</h2>
        </div>
        <div className="saveNewJob">
          <button
            type="button"
            className="blueBtn__round"
            id="submitBtn"
            disabled={isLoading}
            onClick={createListing}>
            &#10004;
          </button>
        </div>
      </div>
      <section className="editJobListing">
        <form className="jobForm">
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

            <div className="jobTypeButtons">
              <button
                type="button"
                className="jobTypeBtn"
                id="fullTime"
                value="Full-Time"
                name="type"
                onClick={fullTimeActive}>
                Full-Time
              </button>
              <button
                type="button"
                className="jobTypeBtn"
                id="partTime"
                value="Part-Time"
                name="type"
                onClick={partTimeActive}>
                Part-Time
              </button>
              <button
                type="button"
                className="jobTypeBtn"
                id="temp"
                value="Full-Time"
                name="type"
                onClick={tempActive}>
                Temp
              </button>
            </div>

            <label
              className="editLabel"
              htmlFor="jobLocation">
              Job Location *
            </label>
            <input
              type="text"
              required
              className="editInput"
              onChange={handleFieldChange}
              id="jobLocation"
            />

            <div className="salaryFields">
              <div className="salaryEdit">
                <label
                  className="editLabel"
                  htmlFor="salary">
                  Salary
                </label>
                <input
                  type="number"
                  className="editInput"
                  onChange={handleFieldChange}
                  id="salary"
                />
              </div>
              <div className="rateEdit">
                {/* <label
                  className="editLabel"
                  htmlFor="rate">
                  Rate
                </label> */}
                <div className="rateToggle">
                  <button
                    type="button"
                    className="rateBtn rate rateSalary"
                    id="salRate"
                    value="Sal"
                    name="rate"
                    onClick={salRateActive}>
                    Sal
                  </button>
                  <button
                    type="button"
                    className="rateBtn rate rateHourly"
                    id="hrRate"
                    value="Hr"
                    name="rate"
                    onClick={hrRateActive}>
                    Hr
                  </button>
                </div>
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
            <br />
            <br />
            <br />
            <br />

          </fieldset>
        </form>
      </section>
    </div>
  )
};

export default JobForm