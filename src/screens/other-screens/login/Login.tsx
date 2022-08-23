import React from "react";
import "./login.scss";
import githubLogo from "../../../resources/images/github.png";
import googleLogo from "../../../resources/images/google.png";
import logo from "../../../resources/images/Shape.png";
import ImageButton from "../../../ui-components/image-button/ImageButton";
import PrimaryButton from "../../../ui-components/primary-button/PrimaryButton";
import { SignInMethod, useUser } from "../../../contexts/user-context/UserContext";

const Login = () => {
  const user = useUser();
  return (
    <div className="login-wrapper">
      <div className="w-100 h-100 b-image">
        <div className="page-header" style={{ backgroundColor: "#27414f" }}>
          <div className="d-flex align-items-center pl-3">
            <img src={logo} alt="" />
            <h4 className="pl-4">GPU - Compute</h4>
          </div>
          <div className="d-flex align-items-center">
          <PrimaryButton onClick={()=>{} } text="New Project"/>
          </div>
        </div>
        <div className="login-form-container">
          <div className="login-form">
            <div className="text-center">
              <h2>Sign in to GPU-Compute</h2>
              <label>Sign in to save your project and collaborate</label>
            </div>
            <div className="mt-5">
              <ImageButton
                className="mt-2"
                image={githubLogo}
                text="Sign in with Github"
                onClick={() => {
                  user.register(SignInMethod.GitHub)
                }}
              />
              <ImageButton
                className="mt-4"
                image={googleLogo}
                text="Sign in with Google"
                onClick={() => {
                  user.register(SignInMethod.Google)
                }}
              />
            </div>
            <div
              className="text-center mt-5"
              style={{ color: "#c9cfd3", fontSize: "9px" }}
            >
              By continuing, you agree to GPU-Cpopute <br />
              <span>Term of Service, Privacy Plolicy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
