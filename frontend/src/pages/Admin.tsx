import ManageCourseTa from "../components/orange/ManageCourseTa";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";

const Admin = () => {
  const adminNav : Array<NavObject> = [
    // { eventKey: "manageUsers", title: "Manage Users", component: <ManageUsers />},
    // { eventKey: "manageProfessors", title: "Manage Professors", component: <ManageProfessors />},
    { eventKey: "manageCourseTa", title: "Manage Course TA", component: <ManageCourseTa />},
    { eventKey: "manageCourses", title: "Manage Courses", component: <ManageCourseTa />},
    { eventKey: "manageCourses", title: "Manage Courses", component: <ManageCourseTa />},
    { eventKey: "manageCourses", title: "Manage Courses", component: <ManageCourseTa />},
  
];

  return (
    <>
      <TopTabs navArray={adminNav}></TopTabs>
    </>
  );
};

export default Admin;

