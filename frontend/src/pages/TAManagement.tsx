import React, { useContext, useState, useEffect } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ChooseCourse from "../components/ta_management/ChooseCourse";
import ViewOHResps from "../components/ta_management/ViewOHResps";
import AddPerformanceLog from "../components/ta_management/AddPerformanceLog";
import AddTAToWishlist from "../components/ta_management/AddTAToWishlist";
import ViewTAReport from "../components/ta_management/ViewTAReport";
import UseChannel from "../components/ta_management/UseChannel";
import { createBackendUrl, callBackend } from "../apiConfig";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";

const TAManagement: React.FC = () => {
    const { user, setUser } = useContext(UserContext);

    // return whether the user is a prof/TA
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
    const [userEmail, setUserEmail] = useState(user.email);

    // Course Selection
    const [courseName, setCourse] = useState("default");
    const [courseNum, setCourseNum] = useState("");
    const [disabled, setDisabled] = useState(true);

    // OH and Responsibilities
    const [displayName, setName] = useState("");
    const [officeHours, setOH] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [officeLocation, setLocation] = useState("");
    const [isInstructor, setTAOrInstructor] = useState(currentProfile == UserTypes.Professor);
    const [missingFieldsError, setMissingError] = useState(false);
    const [ohrespsSuccess, setOHRespsSuccess] = useState(false);

    useEffect(() => {
        setOHRespsSuccess(false);
    }, [displayName, officeHours, responsibilities, officeLocation])

    // set the office hours and responsibilities of the user
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

                if (res.status == 200 || res.status == 201) {
                    setOHRespsSuccess(true);
                }
                
            }  catch (err) {
                // TODO: Message error when missing fields
                console.error(err);
            }
        } else {
            setMissingError(true);
        }
    };

    // Performance Log
    const [loggedTA, setLoggedTA] = useState("default");
    const [performanceLog, setPerformanceLog] = useState("");
    const [missingTAError, setMissingTA] = useState(false);
    const [performanceLogSuccess, setPerformanceLogSuccess] = useState(false);

    useEffect(() => {
        setPerformanceLogSuccess(false);
    }, [loggedTA, performanceLog])

    // add a performance log about a TA
    const handleAddLog = async () => {
        if (loggedTA !== "" && performanceLog !== "") {
            try {
                const url = createBackendUrl("/api/performancelog/add");

                const now = new Date();
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    course_number: courseName.split(" ")[0].toString(),
                    TA_name: loggedTA.split(" ")[0].toString() + " " + loggedTA.split(" ")[1].toString() ,
                    TA_email: loggedTA.split(" ")[2].toString(),
                    time_date_stamped_comment: performanceLog + " (" + new Date().toLocaleString() + ")"
                    }),
                });

                if (res.status == 200 || res.status == 201) {
                    setPerformanceLogSuccess(true);
                    setMissingTA(false);
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            setMissingTA(true);
        }
    }

    // TA Wishlist
    const [wishedTA, setWishedTA] = useState("default");
    const [wishedTerm, setWishedTerm] = useState("default");
    const [wishedYear, setWishedYear] = useState("default");
    const [missingInfoError, setMissingInfo] = useState(false);
    const [wishedTASuccess, setWishedTASuccess] = useState(false);

    useEffect(() => {
        setWishedTASuccess(false);
    }, [wishedTA, wishedTerm, wishedYear])
    
    // add a TA to the prof's wishlist
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
                    TA_name: wishedTA.split(" ")[0].toString() + " " + wishedTA.split(" ")[1].toString(),
                    TA_email: wishedTA.split(" ")[2].toString(),
                    instructor_name: user.first_name.toString() + " " + user.last_name.toString(),
                    instructor_email: user.email.toString(),
                    }),
                });

                if (res.status == 200 || res.status == 201) {
                    setWishedTASuccess(true);
                }
                
            }  catch (err) {
                console.error(err);
            }
        } else {
            setMissingInfo(true);
        }
    }

    // Channel
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postError, setPostError] = useState(false);
    const [postSuccess, setPostSuccess] = useState(false);

    // add a new Post to the course channel
    const handleAddPost  = async () => {
        if (title !== "" && content !== "") {
            try {
                const channelURL = createBackendUrl("/api/channel/create?course_number=" + courseName.split(" ")[0].toString());
                const creationRes = await fetch(channelURL, { // create channel if needed
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    course_number: courseName.split(" ")[0].toString(),
                    }),
                });

                const url = createBackendUrl("/api/channel/post")
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    course_number: courseName.split(" ")[0].toString(),
                    author_name: user.first_name + " " + user.last_name,
                    title: title,
                    content: content,
                    time_date: new Date().toLocaleString(),
                    }),
                });

                if (res.status == 200 || res.status == 201) {
                    setPostSuccess(true);
                    setPostError(false);
                }

            } catch (err) {
                console.error(err);
            }
        } else {
            // error box will pop up
            setPostError(true);
        }
    }

    useEffect(() => {
        setPostSuccess(false);
    }, [title, content])

    let taManagementNav = new Array<NavObject>();
    // a TA has access to different tabs than a prof
    if (currentProfile == UserTypes.TA) {
        taManagementNav = [
            { eventKey: "chooseCourse", title: "Choose Course", component: <ChooseCourse handleCourse={setCourse} isInstructor={isInstructor} userEmail={userEmail} courseName={courseName} />},
            { eventKey: "viewOHResps", title: "OH and Responsibilities", component: <ViewOHResps handleDisplayName={setName} handleOH={setOH} handleOfficeLocation={setLocation} handleResponsibilities={setResponsibilities} handleOHResponsibilities={handleSetOHResps}
            user={user} ohrespsSuccess={ohrespsSuccess} missingFieldsError={missingFieldsError} courseName={courseName} displayName={displayName} officeHours={officeHours} officeLocation={officeLocation} responsibilities={responsibilities} />, disabled: disabled},
            { eventKey: "useChannel", title: "Channel", component: <UseChannel postSuccess={postSuccess} postError={postError} handleTitle={setTitle} handleContent={setContent} handleAddPost={handleAddPost} courseName={courseName} title={title} content={content} />, disabled: disabled},
        ];

    } else {
        taManagementNav = [
            { eventKey: "chooseCourse", title: "Choose Course", component: <ChooseCourse handleCourse={setCourse} isInstructor={isInstructor} userEmail={userEmail} courseName={courseName} />},
            { eventKey: "viewOHResps", title: "OH and Responsibilities", component: <ViewOHResps handleDisplayName={setName} handleOH={setOH} handleOfficeLocation={setLocation} handleResponsibilities={setResponsibilities} handleOHResponsibilities={handleSetOHResps}
            user={user} ohrespsSuccess={ohrespsSuccess} missingFieldsError={missingFieldsError} courseName={courseName} displayName={displayName} officeHours={officeHours} officeLocation={officeLocation} responsibilities={responsibilities} />, disabled: disabled},
            { eventKey: "addPerformanceLog", title: "Performance Log", component: <AddPerformanceLog handleAddLog={handleAddLog} handleLog={setPerformanceLog} handleLoggedTA={setLoggedTA} courseName={courseName} performanceLogSuccess={performanceLogSuccess}
            missingTAError={missingTAError} loggedTA={loggedTA} performanceLog={performanceLog} />, disabled: disabled},
            { eventKey: "addTAToWishlist", title: "TA Wishlist", component: <AddTAToWishlist handleTA={setWishedTA} handleAddTA={handleAddTA} handleTerm={setWishedTerm} handleYear={setWishedYear}
            wishedTASuccess={wishedTASuccess} missingInfoError={missingInfoError} wishedTA={wishedTA} courseName={courseName} wishedTerm={wishedTerm} wishedYear={wishedYear} />, disabled: disabled},
            { eventKey: "taReport", title: "All TAs Report", component: <ViewTAReport courseName={courseName} />, disabled: disabled},
            { eventKey: "useChannel", title: "Channel", component: <UseChannel postSuccess={postSuccess} postError={postError} handleTitle={setTitle} handleContent={setContent} handleAddPost={handleAddPost} courseName={courseName} title={title} content={content} />, disabled: disabled},
        ];
    }

    // when a course is selected, we 'un-disable' all tabs
    useEffect(() => {
        let newDisabled = true;
        if (courseName !== "default") {
            newDisabled = false;
        } 
        setDisabled(newDisabled);

    }, [courseName]);

    return (  
        <TopTabs navArray={taManagementNav}></TopTabs>
    );
};

export default TAManagement;

