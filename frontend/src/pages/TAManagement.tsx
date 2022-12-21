import React, { useContext, useState, useEffect } from "react";
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

    // return user type (sysop > admin > prof)
    function findUserType() {
        let adminSysop = false;
        let prof = false;

        for (let i = 0; i < user.user_types.length; i++) {
            if (user.user_types[i] === UserTypes.Sysop || user.user_types[i] === UserTypes.Admin){
                adminSysop = true;
            } else if (user.user_types[i] === UserTypes.Professor) {
                prof = true;
            }
        }

        if (adminSysop) {
            return UserTypes.Admin; // admin & sysop treated the same (for this section)
        } else if (prof) {
            return UserTypes.Professor;
        }
        return UserTypes.TA;
    }

    // Set a default profile
    const [currentProfile, setCurrentProfile] = useState<UserTypes>(findUserType());
    const [userEmail, setUserEmail] = useState(user.email);

    // Course Selection
    const [courseName, setCourse] = useState("default");
    const [disabled, setDisabled] = useState(true);

    // OH and Responsibilities
    const [displayName, setName] = useState("");
    const [officeHours, setOH] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [officeLocation, setLocation] = useState("");
    const [isInstructor, setInstructor] = useState(user.user_types.includes(UserTypes.Professor));
    const [missingFieldsError, setMissingError] = useState(false);
    const [ohrespsSuccess, setOHRespsSuccess] = useState(false);
    const [adminOHError, setAdminOHError] = useState(false);

    useEffect(() => {
        setOHRespsSuccess(false);
    }, [displayName, officeHours, responsibilities, officeLocation])

    // set the office hours and responsibilities of the user
    const handleSetOHResps = async () => {
        if (displayName !== "" && officeHours !== "" && responsibilities !== "" && officeLocation !== "" && responsibilities !== "") {
            setMissingError(false);
            let access = true;
            // check if user is sysop/admin, and whether they are prof for selected coursed
            if (currentProfile === UserTypes.Admin) {
                try {
                    const res = await callBackend("/api/course/prof/1?email=" + user.email);

                    if (!(res.status === 404)) { // user is a prof
                        const data = await res.json();
                        const currentCourses = [];
                        data.forEach(c => {
                            currentCourses.push(c.course_number);
                        });

                        if (!currentCourses.includes(courseName.split(" ")[0])) {
                            access = false;
                        }

                    } else {
                        access = false;
                        setAdminOHError(true);
                    }
                } catch (err) {
                    //console.log(err);
                }
            }

            if (access) {
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

                    if (res.status === 200 || res.status === 201) {
                        setOHRespsSuccess(true);
                    }

                } catch (err) {
                    //console.error(err);
                }
            } else {
                setAdminOHError(true);
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
    const [adminLogError, setAdminLogError] = useState(false);

    useEffect(() => {
        setPerformanceLogSuccess(false);
    }, [loggedTA, performanceLog])

    // add a performance log about a TA
    const handleAddLog = async () => {
        if (loggedTA !== "" && performanceLog !== "") {
            setMissingTA(false);
            let access = true;
            // check if user is sysop/admin, and whether they are prof for selected coursed
            if (currentProfile === UserTypes.Admin) {
                try {

                    const res = await callBackend("/api/course/prof/1?email=" + user.email);

                    if (!(res.status === 404)) { // user is a prof
                        const data = await res.json();
                        const currentCourses = [];
                        data.forEach(c => {
                            currentCourses.push(c.course_number);
                        });

                        if (!currentCourses.includes(courseName.split(" ")[0])) {
                            access = false;
                        }

                    } else {
                        access = false;
                        setAdminLogError(true);
                    }
                } catch (err) {
                    //console.log(err);
                }
            }

            if (access) {
                try {
                    const url = createBackendUrl("/api/performancelog/add");
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

                    if (res.status === 200 || res.status === 201) {
                        setPerformanceLogSuccess(true);
                        setMissingTA(false);
                    }

                } catch (err) {
                    //console.log(err);
                }
            } else {
                setAdminLogError(true);
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
    const [adminWishlistError, setAdminWishlistError] = useState(false);

    useEffect(() => {
        setWishedTASuccess(false);
    }, [wishedTA, wishedTerm, wishedYear])

    // add a TA to the prof's wishlist
    const handleAddTA = async () => {
        if (wishedTA !== "default" && wishedTerm !== "default" && wishedYear !== "default") {
            setMissingInfo(false);
            let access = true;
            // check if user is sysop/admin, and whether they are prof for selected coursed
            if (currentProfile === UserTypes.Admin) {
                try {

                    const res = await callBackend("/api/course/prof/1?email=" + user.email);

                    if (!(res.status === 404)) { // user is a prof
                        const data = await res.json();
                        const currentCourses = [];
                        data.forEach(c => {
                            currentCourses.push(c.course_number);
                        });

                        if (!currentCourses.includes(courseName.split(" ")[0])) {
                            access = false;
                        }

                    } else {
                        access = false;
                        setAdminWishlistError(true);
                    }
                } catch (err) {
                    //console.log(err);
                }
            }

            if (access) {
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

                    if (res.status === 200 || res.status === 201) {
                        setWishedTASuccess(true);
                    }

                } catch (err) {
                    //console.error(err);
                }

            } else {
                setAdminWishlistError(true);
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
    const [adminChannelError, setAdminChannelError] = useState(false);

    // add a new Post to the course channel
    const handleAddPost  = async () => {
        if (title !== "" && content !== "") {
            setPostError(false);
            let access = true;
            // check if user is sysop/admin, and whether they are prof for selected coursed
            if (currentProfile === UserTypes.Admin) {
                try {

                    const res = await callBackend("/api/course/prof/1?email=" + user.email);

                    if (!(res.status === 404)) { // user is a prof
                        const data = await res.json();
                        const currentCourses = [];
                        data.forEach(c => {
                            currentCourses.push(c.course_number);
                        });

                        if (!currentCourses.includes(courseName.split(" ")[0])) {
                            access = false;
                        }

                    } else {
                        access = false;
                        setAdminChannelError(true);
                    }
                } catch (err) {
                    //console.log(err);
                }
            }

            if (access) {
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

                    if (res.status === 200 || res.status === 201) {
                        setPostSuccess(true);
                        setPostError(false);
                    }

                } catch (err) {
                    //console.error(err);
                }
            } else {
                setAdminChannelError(true);
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
    if (currentProfile === UserTypes.TA) {
        taManagementNav = [
            { eventKey: "chooseCourse", title: "Choose Course", component: <ChooseCourse handleCourse={setCourse}
            isInstructor={isInstructor} userEmail={userEmail} courseName={courseName} currentProfile={currentProfile} />},
            { eventKey: "viewOHResps", title: "OH and Responsibilities", component: <ViewOHResps handleDisplayName={setName} handleOH={setOH} handleOfficeLocation={setLocation} handleResponsibilities={setResponsibilities} handleOHResponsibilities={handleSetOHResps}
            user={user} adminOHError={adminOHError} ohrespsSuccess={ohrespsSuccess} missingFieldsError={missingFieldsError} courseName={courseName} displayName={displayName} officeHours={officeHours} officeLocation={officeLocation} responsibilities={responsibilities} />, disabled: disabled},
            { eventKey: "useChannel", title: "Channel", component: <UseChannel handleTitle={setTitle} handleContent={setContent} handleAddPost={handleAddPost}
            courseName={courseName} title={title} content={content} adminChannelError={adminChannelError} postSuccess={postSuccess} postError={postError} />, disabled: disabled},
        ];

    } else {
        taManagementNav = [
            { eventKey: "chooseCourse", title: "Choose Course", component: <ChooseCourse handleCourse={setCourse}
            isInstructor={isInstructor} userEmail={userEmail} courseName={courseName} currentProfile={currentProfile} />},
            { eventKey: "viewOHResps", title: "OH and Responsibilities", component: <ViewOHResps handleDisplayName={setName} handleOH={setOH} handleOfficeLocation={setLocation} handleResponsibilities={setResponsibilities} handleOHResponsibilities={handleSetOHResps}
            user={user} adminOHError={adminOHError} ohrespsSuccess={ohrespsSuccess} missingFieldsError={missingFieldsError} courseName={courseName} displayName={displayName} officeHours={officeHours} officeLocation={officeLocation} responsibilities={responsibilities} />, disabled: disabled},
            { eventKey: "addPerformanceLog", title: "Performance Log", component: <AddPerformanceLog handleAddLog={handleAddLog} handleLog={setPerformanceLog} handleLoggedTA={setLoggedTA} courseName={courseName} performanceLogSuccess={performanceLogSuccess}
            missingTAError={missingTAError} adminLogError={adminLogError} loggedTA={loggedTA} performanceLog={performanceLog} />, disabled: disabled},
            { eventKey: "addTAToWishlist", title: "TA Wishlist", component: <AddTAToWishlist handleTA={setWishedTA} handleAddTA={handleAddTA} handleTerm={setWishedTerm} handleYear={setWishedYear}
            wishedTASuccess={wishedTASuccess} adminWishlistError={adminWishlistError} missingInfoError={missingInfoError} wishedTA={wishedTA} courseName={courseName} wishedTerm={wishedTerm} wishedYear={wishedYear} />, disabled: disabled},
            { eventKey: "taReport", title: "All TAs Report", component: <ViewTAReport courseName={courseName} />, disabled: disabled},
            { eventKey: "useChannel", title: "Channel", component: <UseChannel handleTitle={setTitle} handleContent={setContent} handleAddPost={handleAddPost}
            courseName={courseName} title={title} content={content} adminChannelError={adminChannelError} postSuccess={postSuccess} postError={postError}   />, disabled: disabled},
        ];
    }

    // when a course is selected, we 'un-disable' all tabs
    useEffect(() => {
        let newDisabled = true;
        if (courseName !== "default") {
            newDisabled = false;
        }
        setDisabled(newDisabled);

        setOHRespsSuccess(false);
        setAdminOHError(false);

        setPerformanceLogSuccess(false);
        setAdminLogError(false);

        setWishedTASuccess(false);
        setAdminWishlistError(false);

        setPostSuccess(false);
        setAdminChannelError(false);

    }, [courseName]);

    return (
        <TopTabs navArray={taManagementNav}></TopTabs>
    );
};

export default TAManagement;
