import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import combinedLogos from "../assets/images/combined-logos.png";
import socsLogo from "../assets/images/socs-logo.png";
import mcgillLogo from "../assets/images/mcgill-logo.png";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ManageCourses from "../components/sysop/ManageCourses";
import TaHistory from "../components/orange/TaHistory";
import TaAdminImportFile from "../components/orange/TaAdminImportFile";
import TaInfo from "../components/orange/TaInfo";
import RoleTabs from "../components/primaryTopbar";
import "../App.css";
import "../style/subTopbar.css";
import { Container, Navbar, Tabs, Tab } from "react-bootstrap";

const AdminCourse: React.FC = () => {
  const navigate = useNavigate();
  function handleLogout(): void {
    navigate("/logout");
  }

  const tabNamesToJSX = new Map<string, JSX.Element>([
    ["Manage a Course", <ManageCourses />],
    ["Course TA History", <TaHistory />],
    ["Import Document", <TaAdminImportFile />],
    ["TA Information", <TaInfo />]
  ]);

  const tabsPerProfile = new Map<UserTypes, Array<string>>([
    [UserTypes.Admin, ["Manage a Course", "Course TA History", "Import Document", "TA Information"]],
  ]);

  const [currentProfile, setCurrentProfile] = useState<UserTypes>(
    UserTypes.Admin
  );

  // Set the default array of tabs relative to our default profile
  const [currentTabs, setCurrentTabs] = useState<Array<string>>(
    tabsPerProfile.get(currentProfile)!
  );


  return (
    <div>
      <div className="top-container">
        <Navbar></Navbar>
        <Container>
          <RoleTabs></RoleTabs>
        </Container>
      </div>
      <div>
        <Container>
          <Tabs
            defaultActiveKey="0"
            transition={false}
            id="noanim-tab"
            className="sub"
          >
            {currentTabs.map((currentTabName, i) => (
              <Tab key={i} eventKey={i} title={currentTabName}>
                {tabNamesToJSX.get(currentTabName)}
              </Tab>
            ))}
          </Tabs>
        </Container>
      </div>
    </div>
  );
};

export default AdminCourse;
