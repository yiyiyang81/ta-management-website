import ManageCourses from "../components/sysop/ManageCourses";
import ManageProfessors from "../components/sysop/ManageProfessors";
import ManageUsers from "../components/sysop/ManageUsers";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";
const Sysop = () => {
  const studentNav : Array<NavObject> = [
    { eventKey: "manageUsers", title: "Manage Users", component: <ManageUsers />},
    { eventKey: "manageProfessors", title: "Manage Professors", component: <ManageProfessors />},
    { eventKey: "manageCourses", title: "Manage Courses", component: <ManageCourses />},
  ];

  return (
    <>
      <TopTabs navArray={studentNav}></TopTabs>
    </>
  );
};

export default Sysop;

