import React from "react"
import { useHistory } from "react-router-dom";
  
const Register = props => {
  const history = useHistory();

  return (
    <div id="root-wrapper">
      <div className="backButton">
        <button
          type="submit"
          className="backbutton"
          onClick={() => history.push("/")}>
          <img src="https://res.cloudinary.com/dhduglm4j/image/upload/v1596490014/icons/backarrow_lfdpzw.png" className="backToHome" alt="back" />
        </button>
      </div>
      <main className="registerContainer">
        <h1>I am...</h1>
        <br />
        <br />
        <div className="typeButtons">
          <div className="candidateButton">
            <button
              type="submit"
              className="reg-candidateBtn"
              onClick={() => history.push("/register-candidate")}>
              Looking for Work
            </button>
          </div>
          <br />
          <div className="employerButton">
            <button
              type="submit"
              className="reg-employerBtn"
              onClick={() => history.push("/register-employer")}>
              Looking for Talent
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;