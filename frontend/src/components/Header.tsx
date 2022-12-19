import socsLogo from "../assets/images/socs-logo.png";
import mcgillLogo from "../assets/images/mcgill-logo.png";
import combinedLogos from "../assets/images/combined-logos.png";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import "../style/header.css";

const Header = (props: {profile: String}) => {
  const navigate = useNavigate();
  function handleLogout(): void {
    navigate("/logout");
  }
  function handleDashboard(): void {
    navigate("/dashboard")
  }

  const location = useLocation();
  const displayHeader = () => {
    const pathname = location.pathname;
    if (
      pathname === "/logout" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/"
    )
      return false;
    else return true;
  };

  if (displayHeader() && location.pathname === "/dashboard") {
    return (
      <>
        <div className="header-container-dashboard">
          <div className="logo-container">
            <div className="d-md-none d-flex flex-column align-items-center">
              <img className="logo" src={socsLogo} alt="socs-logo" />
              <img className="logo" src={mcgillLogo} alt="mcgill-logo" />
              <div className="dashboard-button-container mt-2">
                <Button
                  width="7rem"
                  type="primary"
                  value="Logout"
                  onClick={handleLogout}
                ></Button>
              </div>
            </div>
          </div>
          <div className="header-content-dashboard d-none d-md-block">
            <div className="d-flex align-items-end justify-content-between">
              <img
                className="header-logo"
                src={combinedLogos}
                alt="mcgill-logo"
              />
              <div className="dashboard-button-container">
                <Button
                  width="6rem"
                  type="primary"
                  value="Logout"
                  onClick={handleLogout}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (!displayHeader()) {
    return <></>;
  } else {
    return (
      <>
        <div className="header-container">
          <div className="logo-container">
            <div className="d-lg-none d-flex flex-column align-items-center">
              <img className="logo" src={socsLogo} alt="socs-logo" />
              <img className="logo" src={mcgillLogo} alt="mcgill-logo" />
              <div className="button-container mt-2">
                <div className="role-text text-center mb-2">
                  Viewing <span className="header-user-role">{props.profile}</span>
                </div>
                <div className="button-container">
                  <Button
                    width="12rem"
                    type="secondary"
                    value="Return to Dashboard"
                    onClick={handleDashboard}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
          <div className="header-content d-none d-lg-block">
            <div className="d-flex align-items-end justify-content-between">
              <img
                className="header-logo"
                src={combinedLogos}
                alt="mcgill-logo"
              />
              <div className="right-subcontainer d-flex align-items-center justify-content-center">
                <div className="role-text text-center">
                  Viewing <span className="header-user-role">{props.profile}</span>
                </div>
                <div className="button-container">
                  <Button
                    width="12rem"
                    type="secondary"
                    value="Return to Dashboard"
                    onClick={handleDashboard}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Header;
