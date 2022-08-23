import "./home.scss";
import logo from "../../../resources/images/Shape.png";
import buildIcon from "../../../resources/images/build.png";
import discoverIcon from "../../../resources/images/geosearch.png";
import shareIcon from "../../../resources/images/users.png";
import { useHistory } from "react-router";
import React from "react";
import PrimaryButton from "../../../ui-components/primary-button/PrimaryButton";
import DefaultButton from "../../../ui-components/default-button/DefaultButton";

const Home = () => {
  const { push } = useHistory();

  return (
    <div className="home-wrapper">
      <div className="w-100 h-100 b-image">
        <div className="page-header" style={{ backgroundColor: "#27414f" }}>
          <div className="d-flex align-items-center pl-3">
            <img src={logo} alt="" />
            <h4 className="pl-4">GPU - Compute</h4>
          </div>
          <div className="d-flex align-items-center">
            <label
              style={{ fontSize: "14px", fontWeight: 700 }}
              className="mr-3 hover"
              onClick={() => push("/login")}
            >
              Sign in
            </label>
            <PrimaryButton onClick={() => {}} text="Create Project" />
          </div>
        </div>
        <div className="home-form-container">
          <h1
            style={{ marginTop: "8%", marginBottom: "50px", fontSize: "36px" }}
          >
            Lorem ipsum dolor sit amet
          </h1>
          <div className="container fluid">
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="home-form">
                  <img src={buildIcon} alt="" className="hcard-icon" />
                  <div className="text-center">
                    <h2 style={{ fontSize: "30px" }}>Build & Test</h2>
                  </div>
                  <div className="mt-3 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi
                    sit massa mauris, porttitor massa. Feugiat tincidunt
                    vulputate massa lacus. Arcu id id elementum id adipiscing
                    volutpat risus. Tortor commodo velit massa venenatis, cras
                    sed ultrices purus.
                  </div>
                  <div className="text-center mt-4">
                    <DefaultButton
                      onClick={() => push("/home")}
                      text="Try the Editor"
                    />
                    {/* <Button large onClick={()=>push("/home")}>Try the Editor</Button> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="home-form">
                  <img src={discoverIcon} alt="" className="hcard-icon" />
                  <div className="text-center">
                    <h2 style={{ fontSize: "30px" }}>Discover</h2>
                  </div>
                  <div className="mt-3 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi
                    sit massa mauris, porttitor massa. Feugiat tincidunt
                    vulputate massa lacus. Arcu id id elementum id adipiscing
                    volutpat risus. Tortor commodo velit massa venenatis, cras
                    sed ultrices purus.
                  </div>
                  <div className="text-center mt-4">
                    <DefaultButton
                      onClick={() => push("/home")}
                      text="Learn More"
                    />
                    {/* <Button large>Learn More </Button> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="home-form">
                  <img src={shareIcon} alt="" className="hcard-icon" />
                  <div className="text-center">
                    <h2 style={{ fontSize: "30px" }}>Share Work</h2>
                  </div>
                  <div className="mt-3 text-center" style={{fontSize:"14px"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi
                    sit massa mauris, porttitor massa. Feugiat tincidunt
                    vulputate massa lacus. Arcu id id elementum id adipiscing
                    volutpat risus. Tortor commodo velit massa venenatis, cras
                    sed ultrices purus.
                  </div>
                  <div className="text-center mt-4">
                    <DefaultButton
                      onClick={() => push("/home")}
                      text="Explore"
                    />
                    {/* <Button large>Explore</Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 d-flex" style={{ justifyContent: "center" }}>
            <div style={{ width: "180px" }}>
              <PrimaryButton onClick={() => {}} text="Create Project" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
