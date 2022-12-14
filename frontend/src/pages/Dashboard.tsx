import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ManageProfessors from "../components/sysop/ManageProfessors";
import ManageCourses from "../components/sysop/ManageCourses";
import ManageUsers from "../components/sysop/ManageUsers";
import "../style/dashboard.css";
import Tile from "../common/Tile";
import StudentIcon from "../assets/images/student-icon.png";
import TeachingAssitantIcon from "../assets/images/ta-icon.png";
import InstructorIcon from "../assets/images/instructor-icon.png";
import TeachingAssistantAdminIcon from "../assets/images/ta-admin-icon.png";
import SysopIcon from "../assets/images/sysop-icon.png";

export const Dashboard = () => {
  const tabsPerProfile = new Map<UserTypes, Array<string>>([
    [UserTypes.Sysop, ["Professors", "Courses", "Users"]],
  ]);

  const tabNamesToJSX = new Map<string, JSX.Element>([
    ["Professors", <ManageProfessors />],
    ["Courses", <ManageCourses />],
    ["Users", <ManageUsers />],
  ]);

  const navigate = useNavigate();
  /**
   * Get list of user's profiles/types
   * @TODO Retrieve this information from the actual global user state
   */
  const { user, setUser } = useContext(UserContext);
  const userFirstName = "Marlene";
  const userLastName = "Liang";
  // Set a default profile
  const [currentProfile, setCurrentProfile] = useState<UserTypes>(
    UserTypes.Sysop
  );

  // Set the default array of tabs relative to our default profile
  const [currentTabs, setCurrentTabs] = useState<Array<string>>(
    tabsPerProfile.get(currentProfile)!
  );

  // On nav bar selection, this function sets the new current profile and associated tabs.
  function handleNavClick(profile: UserTypes): void {
    setCurrentProfile(profile);
    setCurrentTabs(tabsPerProfile.get(profile)!);
  }

  // useEffect(() => {
  //   // if no user redirect to login page
  //   if (!user.email) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  // PLACEHOLDER
  // TODO: MODIFY HANDLE NAV CLICK
  const handleNavigation = (role: string) => {
    console.log("Logging in as", role)
    navigate("/course");
  }

  // Render nav dropdown options and nav tabs based on state above
  return (
    <>
      <div className="dashboard-container">
        <div className="d-flex flex-column align-items-center pt-5">
          <h1>
            Welcome to your dashboard, {userFirstName} {userLastName}
          </h1>
          <h4>Continue viewing as:</h4>
          <div className="top-tiles-container d-md-flex justify-content-evenly mb-md-4 mt-3">
            <Tile
              image={StudentIcon}
              value="Student"
              width="15rem"
              margin="0rem 0rem 0.5rem 0rem"
              onClick={() => handleNavigation("Student")}
            ></Tile>
            <Tile
              image={TeachingAssitantIcon}
              value="Teaching Assistant"
              width="15rem"
              margin="0rem 0rem 0.5rem 0rem"
              onClick={() => handleNavigation("Teaching Assistant")}
            ></Tile>
            <Tile
              image={InstructorIcon}
              value="Instructor"
              width="15rem"
              margin="0rem 0rem 0.5rem 0rem"
              onClick={() => handleNavigation("Instructor")}
            ></Tile>
          </div>
          <div className="bottom-tiles-container d-md-flex justify-content-evenly">
            <Tile
              image={TeachingAssistantAdminIcon}
              value="TA Administrator"
              width="15rem"
              margin="0rem 0rem 0.5rem 0rem"
              onClick={() => handleNavigation("TA Admin")}

            ></Tile>
            <Tile
              image={SysopIcon}
              value="Sysop"
              width="15rem"
              margin="0rem 0rem 1rem 0rem"
              onClick={() => handleNavigation("Sysop")}
            ></Tile>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
