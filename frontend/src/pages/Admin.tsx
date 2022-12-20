import ManageCourseTa from "../components/orange/ManageCourseTa";
import CourseTaHistory from "../components/orange/CourseTaHistory";
import TaInfo from "../components/orange/TAInfo";
import TaAdminImportFile from "../components/orange/TaAdminImportFile";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";

const Admin = () => {
    const adminNav: Array<NavObject> = [
        // { eventKey: "manageUsers", title: "Manage Users", component: <ManageUsers />},
        // { eventKey: "manageProfessors", title: "Manage Professors", component: <ManageProfessors />},
        { eventKey: "manageCourseTa", title: "Manage Course TA", component: <ManageCourseTa /> },
        { eventKey: "courseTaHistory", title: "Course TA History", component: <CourseTaHistory /> },
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

