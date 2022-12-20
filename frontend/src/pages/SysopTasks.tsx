import { useEffect, useState } from "react";
import { User } from "../classes/User";
import ManageCourses from "../components/sysop/ManageCourses";
import ManageProfessors from "../components/sysop/ManageProfessors";
import ManageUsers from "../components/sysop/ManageUsers";
import TopTabs from "../components/TopTabs";
import { NavObject } from "../components/TopTabs";
import { ProfHelper } from "../helpers/ProfHelper";
import { UserHelper } from "../helpers/UserHelper";
import { CourseHelper } from "../helpers/CourseHelper";
import { Course } from "../classes/Course";
import { Professor } from "../classes/Professor";

const SysopTasks = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [profs, setProfs] = useState<Array<Professor>>([]);
  const [courses, setCourses] = useState<Array<Course>>([]);

  const loadUsers = async () => {
    const users = await UserHelper.fetchUserData();
    setUsers(users);
  };

  const loadProfs = async () => {
    const profs = await ProfHelper.fetchProfData();
    setProfs(profs);
  };

  const loadCourses = async() => {
    const courses = await CourseHelper.fetchCourseData();
    setCourses(courses);
  }

  useEffect(() => {
    loadUsers();
    loadProfs();
    loadCourses();
  }, []);

  const studentNav: Array<NavObject> = [
    {
      eventKey: "manageUsers",
      title: "Manage Users",
      component: <ManageUsers users={users} loadUserData={loadUsers} />,
    },
    {
      eventKey: "manageProfessors",
      title: "Manage Professors",
      component: <ManageProfessors loadProfsData={loadProfs} profs={profs} />,
    },
    {
      eventKey: "manageCourses",
      title: "Manage Courses",
      component: <ManageCourses loadCoursesData={loadCourses} courses={courses} />,
    },
  ];

  return (
    <>
      <TopTabs navArray={studentNav}></TopTabs>
    </>
  );
};

export default SysopTasks;
