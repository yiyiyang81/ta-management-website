import ManageCourseTa from "../components/orange/ManageCourseTa";
import CourseTaHistory from "../components/orange/CourseTaHistory";
import TaInfo from "../components/orange/TAInfo";
import TaAdminImportFile from "../components/orange/TaAdminImportFile";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";
import { useState } from "react";

const Admin = () => {
    const [courseNumber, setCourseNumber] = useState("default");

    const adminNav: Array<NavObject> = [
        { eventKey: "manageCourseTa", title: "Manage Course TA", component: <ManageCourseTa courseNumber={courseNumber} setCourseNumber={setCourseNumber} /> },
        { eventKey: "courseTaHistory", title: "Course TA History", component: <CourseTaHistory courseNumber={courseNumber} setCourseNumber={setCourseNumber} /> },
        { eventKey: "importTaAdminFile", title: "Import File", component: <TaAdminImportFile /> },
        { eventKey: "taInfo", title: "TA Information", component: <TaInfo /> },

    ];

    return (
        <>
            <TopTabs navArray={adminNav}></TopTabs>
        </>
    );
};

export default Admin;

