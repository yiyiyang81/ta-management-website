import React, { useContext, useState, useEffect } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ChooseCourse from "../components/ta_management/ChooseCourse";
import ViewOHResps from "../components/ta_management/ViewOHResps";
import AddTAToWishlist from "../components/ta_management/AddTAToWishlist";
import ViewTAReport from "../components/ta_management/ViewTAReport";
import UseChannel from "../components/ta_management/UseChannel";
import { createBackendUrl } from "../apiConfig";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";

const TAManagement: React.FC = () => {
    const { user, setUser } = useContext(UserContext);
    console.log(user.user_types)

    function findUserType() {
        for (let i = 0; i < user.user_types.length; i++) {
            if (user.user_types[i] === UserTypes.Professor) {
                return UserTypes.Professor;
            }
        }
        return UserTypes.TA;
    }

    // Set a default profile
    const [currentProfile, setCurrentProfile] = useState<UserTypes>(findUserType());

    const tabsPerProfile = new Map<UserTypes, Array<string>>([
        [UserTypes.Professor, ["Course Selection", "OH and Responsibilities", "TA Wishlist", "All TAs Report", "Channel"]],
        [UserTypes.TA, ["Course Selection", "OH and Responsibilities", "Channel"]]
    ]);

    const [currentTabs, setCurrentTabs] = useState<Array<string>>(
        tabsPerProfile.get(currentProfile)!
    );

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
    const [missingFieldsError, setMissingError] = useState(false);

    const handleSetOHResps = async () => {

        if (displayName !== "" && officeHours !== "" && responsibilities !== "" && officeLocation !== "" && responsibilities !== "") {
            try {

                const url = createBackendUrl("/api/ohresps/set");
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    course_number: courseName.split(" ")[0].toString(),
                    is_instructor: isInstructor.toString(),
                    full_name: displayName.toString(),
                    email: user.email.toString(),
                    office_hours: officeHours.toString(),
                    location: officeLocation.toString(),
                    responsibilities: responsibilities.toString()
                    }),
                });
                
            }  catch (err) {
                // TODO: Message error when missing fields
                console.error(err);
            }
        } else {
            setMissingError(true);
        }
    };

    // TA Wishlist
    const [wishedTA, setWishedTA] = useState("default");
    const [wishedTerm, setWishedTerm] = useState("default");
    const [wishedYear, setWishedYear] = useState("default");
    const [missingInfoError, setMissingInfo] = useState(false);

    const handleAddTA = async () => {
        
        if (wishedTA !== "default" && wishedTerm !== "default" && wishedYear !== "default") {
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
        } else {
            setMissingInfo(true);
        }
    }

    const taManagementNav : Array<NavObject> = [
        { eventKey: "chooseCourse", title: "Choose Course", component: <ChooseCourse handleCourse={handleHiddenTabs} courseName={courseName} />},
        { eventKey: "viewOHResps", title: "OH and Responsibilities", component: <ViewOHResps handleDisplayName={setName} handleOH={setOH} handleOfficeLocation={setLocation} handleResponsibilities={setResponsibilities} handleOHResponsibilities={handleSetOHResps}
        user={user} missingFieldsError={missingFieldsError} courseName={courseName} displayName={displayName} officeHours={officeHours} officeLocation={officeLocation} responsibilities={responsibilities} />},
        { eventKey: "addTAToWishlist", title: "TA Wishlist", component: <AddTAToWishlist handleTA={setWishedTA} handleAddTA={handleAddTA} handleTerm={setWishedTerm} handleYear={setWishedYear}
        missingInfoError={missingInfoError} wishedTA={wishedTA} courseName={courseName} wishedTerm={wishedTerm} wishedYear={wishedYear} />},
        { eventKey: "taReport", title: "All TAs Report", component: <ViewTAReport courseName={courseName} />},
        { eventKey: "useChannel", title: "Channel", component: <UseChannel courseName={courseName} />},

    ];

    return (  
        <TopTabs navArray={taManagementNav}></TopTabs>
    );
};

export default TAManagement;

