import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import "../style/dashboard.css";
import Tile from "../common/Tile";
import StudentIcon from "../assets/images/student-icon.png";
import TeachingAssitantIcon from "../assets/images/ta-icon.png";
import InstructorIcon from "../assets/images/instructor-icon.png";
import TeachingAssistantAdminIcon from "../assets/images/ta-admin-icon.png";
import SysopIcon from "../assets/images/sysop-icon.png";

export const Dashboard = (props: {
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const navigate = useNavigate();
  /**
   * Get list of user's profiles/types
   * @TODO Retrieve this information from the actual global user state
   */
  const { user } = useContext(UserContext);
  const userTypes = user.user_types;
  console.log(user);
  const checkType = (type: UserTypes) => {
    if (userTypes.filter((val) => val === type).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isStudent = checkType(UserTypes.Student);
  const isTA = checkType(UserTypes.TA);
  const isProfessor = checkType(UserTypes.Professor);
  const isAdmin = checkType(UserTypes.Admin);
  const isSysop = checkType(UserTypes.Sysop);

  useEffect(() => {
    // if no user redirect to login page
    if (!user.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleNavigation = (role: string) => {
    switch (role) {
      case "Student":
        props.setProfile("Student")
        navigate("/student");
        break;

      case "Teaching Assistant":
        props.setProfile("Teaching Assistant")
        navigate("/ta");
        break;

      case "Professor":
        props.setProfile("Professor")
        navigate("/professor");
        break;

      case "TA Administrator":
      props.setProfile("TA Administrator")
        navigate("/ta-admin");
        break;

      case "Sysop":
        props.setProfile("Sysop")
        navigate("/sysop");
        break;
    }
  };

  // Render nav dropdown options and nav tabs based on state above
  return (
    <>
      <div className="dashboard-container">
        <div className="d-flex flex-column align-items-center pt-5">
          <h1 className="text-center">
            Welcome to your dashboard, {user.first_name} {user.last_name}
          </h1>
          <h4>Continue viewing as:</h4>
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {isStudent && (
              <Tile
                image={StudentIcon}
                value="Student"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("Student")}
              ></Tile>
            )}
            {isTA && (
              <Tile
                image={TeachingAssitantIcon}
                value="Teaching Assistant"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("Teaching Assistant")}
              ></Tile>
            )}
            {isProfessor && (
              <Tile
                image={InstructorIcon}
                value="Professor"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("Professor")}
              ></Tile>
            )}
            {isAdmin && (
              <Tile
                image={TeachingAssistantAdminIcon}
                value="TA Administrator"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("TA Administrator")}
              ></Tile>
            )}
            {isSysop && (
              <Tile
                image={SysopIcon}
                value="Sysop"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("Sysop")}
              ></Tile>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
