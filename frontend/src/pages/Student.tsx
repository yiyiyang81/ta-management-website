import React, { useState } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RoleTabs from "../components/RoleTabs";
import ManageCourses from "../components/sysop/ManageCourses";
import { UserTypes } from "../enums/UserTypes";

const Student = () => {
  const navigate = useNavigate();
  function handleLogout(): void {
    navigate("/logout");
  }

  const tabNamesToJSX = new Map<string, JSX.Element>([
    ["Courses", <ManageCourses />],
  ]);

  const tabsPerProfile = new Map<UserTypes, Array<string>>([
    [UserTypes.Admin, ["Courses"]],
  ]);

  const [currentProfile, setCurrentProfile] = useState<UserTypes>(
    UserTypes.Admin
  );

  // Set the default array of tabs relative to our default profile
  const [currentTabs, setCurrentTabs] = useState<Array<string>>(
    tabsPerProfile.get(currentProfile)!
  );
  return (
    <>
      <div className="top-container">
        <Navbar></Navbar>
        <Container>
          <RoleTabs></RoleTabs>
        </Container>
      </div>
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
    </>
  );
};

export default Student;
