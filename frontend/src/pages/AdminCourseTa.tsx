import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ManageCourseTa from "../components/orange/ManageCourseTa";
import TaHistory from "../components/orange/TaHistory";
import TaAdminImportFile from "../components/orange/TaAdminImportFile";
import TaInfo from "../components/orange/TaInfo";
import TopTabs from "../components/TopTabs";
import "../App.css";
import "../style/subTopbar.css";
import { Container, Navbar, Tabs, Tab } from "react-bootstrap";

const AdminCourseTa: React.FC = () => {
  const navigate = useNavigate();
  function handleLogout(): void {
    navigate("/logout");
  }

  const tabNamesToJSX = new Map<string, JSX.Element>([
    ["Manage Course Ta", <ManageCourseTa />],
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
      {/* <TopTabs navArray={[]}></TopTabs> */}
      <Container>
        <Tabs
          defaultActiveKey="0"
          transition={false}
          id="noanim-tab"
          className="sub"
        >
          {currentTabs.map((currentTabName, i) => (
            <Tab className="sub" key={i} eventKey={i} title={currentTabName}>
              {tabNamesToJSX.get(currentTabName)}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default AdminCourseTa;
