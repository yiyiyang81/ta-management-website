import React, { useContext, useState, useEffect } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import RoleTabs from "../components/primaryTopbar";
import ChooseCourse from "../components/ta_management/ChooseCourse";
import ViewOHResps from "../components/ta_management/ViewOHResps";
import AddTAToWishlist from "../components/ta_management/AddTAToWishlist";
import ViewTAReport from "../components/ta_management/ViewTAReport";
import UseChannel from "../components/ta_management/UseChannel";
import { createBackendUrl } from "../apiConfig";

const TAManagement: React.FC = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

     // Set a default profile
     const [currentProfile, setCurrentProfile] = useState<UserTypes>(
        UserTypes.Professor
    );

    const tabsPerProfile = new Map<UserTypes, Array<string>>([
        [UserTypes.Professor, ["Course Selection", "OH and Responsibilities", "TA Wishlist", "All TAs Report", "Channel"]],
    ]);

    const [currentTabs, setCurrentTabs] = useState<Array<string>>(
        tabsPerProfile.get(currentProfile)!
    );

    const [termYear, setTermYear] = useState("Winter 2023"); // to change

    // Course Selection
    const [courseName, setCourse] = useState("default");
    const [disabled, setDisable] = useState(true);

    function handleHiddenTabs(course: string) {
        setCourse(course);
        setDisable(false);
    }

    // OH and Responsibilities
    const [displayName, setName] = useState("");
    const [officeHours, setOH] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [officeLocation, setLocation] = useState("");
    const [isInstructor, setTAOrInstructor] = useState(currentProfile == UserTypes.Professor);

    const handleSetOHResps = async () => {
        try {

            const url = createBackendUrl("/api/ohresps/set");
            const res = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  term_year: "Fall 2022" /*+ new Date().getFullYear()*/,
                  course_number: courseName.split(" ")[0].toString(),
                  is_instructor: isInstructor.toString(),
                  full_name: displayName.toString(),
                  email: "@" /*user.email.toString()*/,
                  office_hours: officeHours.toString(),
                  location: officeLocation.toString(),
                  responsibilities: responsibilities.toString()
                }),
              });
            
        }  catch (err) {
            // TODO: Message error when missing fields
            console.error(err);
        }
    };

    // TA Wishlist
    const [wishedTA, setWishedTA] = useState("default");
    const [wishedTerm, setWishedTerm] = useState("default");
    const [wishedYear, setWishedYear] = useState("default");

    const handleAddTA = async () => {
        try {
            const url = createBackendUrl("/api/tawishlist/add");
            const res = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  next_term_year: wishedTerm.toString() + " " + wishedYear.toString(),
                  course_number: courseName.split(" ")[0].toString(),
                  TA_name: wishedTA.split(" ")[0].toString(),
                  TA_email: wishedTA.split(" ")[1].toString(),
                  instructor_name: "bob"/*user.name.toString()*/,
                  instructor_email: "bob@" /*user.email.toString()*/,
                }),
              });
            
        }  catch (err) {
            console.error(err);
        }
    }

    const tabNamesToJSX = new Map<string, JSX.Element>([
        ["Course Selection", <ChooseCourse handleCourse={handleHiddenTabs} courseName={courseName} />],
        ["OH and Responsibilities", <ViewOHResps handleDisplayName={setName} handleOH={setOH} handleOfficeLocation={setLocation} handleResponsibilities={setResponsibilities} handleOHResponsibilities={handleSetOHResps}
                                    courseName={courseName} displayName={displayName} officeHours={officeHours} officeLocation={officeLocation} responsibilities={responsibilities}/>],
        ["TA Wishlist", <AddTAToWishlist handleTA={setWishedTA} handleAddTA={handleAddTA} handleTerm={setWishedTerm} handleYear={setWishedYear}
                        wishedTA={wishedTA} courseName={courseName} wishedTerm={wishedTerm} wishedYear={wishedYear} />],
        ["All TAs Report", <ViewTAReport courseName={courseName} />],
        ["Channel", <UseChannel termYear={termYear} courseName={courseName} />]
      ]);

    return (  
        <div>
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
                        <Tab style={{ background:"white"}} className="sub" key={i} eventKey={i} title={currentTabName} disabled={disabled}>
                            {tabNamesToJSX.get(currentTabName)} 
                
                        </Tab>
                    ))}

                </Tabs>
            </Container>
            <div>
            </div>
        </div>
        
    );
};

export default TAManagement;

