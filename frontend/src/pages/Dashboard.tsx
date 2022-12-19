import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import "../style/dashboard.css";
import Tile from "../common/Tile";
import RatingIcon from "../assets/images/rating-icon.png";
import TeachingAssitantIcon from "../assets/images/ta-icon.png";
import TeachingAssistantAdminIcon from "../assets/images/ta-admin-icon.png";
import SysopIcon from "../assets/images/sysop-icon.png";

export const Dashboard = (props: {
  setTaskProfile: React.Dispatch<React.SetStateAction<any>>;
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

  const isTA = checkType(UserTypes.TA);
  const isProfessor = checkType(UserTypes.Professor);
  const isAdmin = checkType(UserTypes.Admin);
  const isSysop = checkType(UserTypes.Sysop);
  const canViewTAAdministration = isAdmin || isSysop;
  const canViewTAManagement = isProfessor || isSysop || isAdmin || isTA;

  useEffect(() => {
    // if no user redirect to login page
    if (!user.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleNavigation = (task: string) => {
    switch (task) {
      case "Rate a TA":
        props.setTaskProfile("Rate a TA");
        navigate("/dashboard/rate-ta");
        break;

      case "TA Management":
        props.setTaskProfile("TA Management");
        navigate("/dashboard/ta-management");
        break;

      case "TA Administration":
        props.setTaskProfile("TA Administration");
        navigate("/dashboard/ta-administration");
        break;

      case "Sysop Tasks":
        props.setTaskProfile("Sysop Tasks");
        navigate("/dashboard/sysop-tasks");
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
          <h4>What would you like to do?</h4>
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <Tile
              image={RatingIcon}
              value="Rate a TA"
              width="15rem"
              margin="0.5rem"
              onClick={() => handleNavigation("Rate a TA")}
            ></Tile>

            {canViewTAManagement && (
              <Tile
                image={TeachingAssitantIcon}
                value="TA Management"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("TA Management")}
              ></Tile>
            )}
            {canViewTAAdministration && (
              <Tile
                image={TeachingAssistantAdminIcon}
                value="TA Administration"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("TA Administration")}
              ></Tile>
            )}
            {isSysop && (
              <Tile
                image={SysopIcon}
                value="Sysop Tasks"
                width="15rem"
                margin="0.5rem"
                onClick={() => handleNavigation("Sysop Tasks")}
              ></Tile>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
