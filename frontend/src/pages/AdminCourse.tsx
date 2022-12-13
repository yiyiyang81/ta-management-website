import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import combinedLogos from "../assets/images/combined-logos.png";
import socsLogo from "../assets/images/socs-logo.png";
import mcgillLogo from "../assets/images/mcgill-logo.png";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ManageCourses from "../components/sysop/ManageCourses";
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
        ["Courses", <ManageCourses />],
    ]);

    const tabsPerProfile = new Map<UserTypes, Array<string>>([
        [UserTypes.Sysop, ["Courses"]],
    ]);

    const [currentProfile, setCurrentProfile] = useState<UserTypes>(
        UserTypes.Sysop
    );

    // Set the default array of tabs relative to our default profile
    const [currentTabs, setCurrentTabs] = useState<Array<string>>(
        tabsPerProfile.get(currentProfile)!
    );

    return (
        <div><Navbar>
            <div className="container">
                <div className="logo-container mb-5">
                    <a className="stacked-logos d-sm-none d-flex flex-column" href="/">
                        <img className="logo" src={socsLogo} alt="socs-logo" />
                        <img className="logo" src={mcgillLogo} alt="mcgill-logo" />
                    </a>
                    <a className="d-none d-sm-block" href="/">
                        <img className="logo" src={combinedLogos} alt="mcgill-logo" />
                    </a>
                </div>

                <button className="logout" onClick={() => handleLogout()}>
                    <LogoutIcon />
                </button>
            </div>
        </Navbar>
            <Container>
                <RoleTabs>
                </RoleTabs>
            </Container>

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
            </Container></div>
    );
}

export default AdminCourse;