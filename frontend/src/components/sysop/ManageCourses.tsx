import React, { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseRow from "./CourseRow";
import "../../style/userTable.css";
import { Course } from "../../classes/Course";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import { callBackend, createBackendUrl } from "../../apiConfig";
import SearchCourse from "../orange/SearchCourse";
import Button from "../../common/Button";


const ManageCourses = () => {

  const [subPage, setSubPage] = useState("Search");

  const [courses, setCourses] = useState<Array<Course>>([]);
  const [termYear, setTermYear] = useState("default");
  const [courseNumber, setCourseNumber] = useState("default");
  const [displayError, setDisplayError] = useState(false);
  const [courseInfo, setCourseInfo] = useState("");

  const fetchCourseData = async () => {
    try {
      const res = await callBackend("/api/course/",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const courseObject = [];
      for (const d of data.courses) {
        // const instructorRes = await callBackend("/api/users/" + d.courseInstructor);
        let item = {
          course_number: d.course_number,
          course_name: d.course_name,
          course_type: d.course_type,
          term_year: d.term_year,
          course_description: d.course_description,
          course_enrollment_num: d.course_enrollment_num,
          TA_quota:d.TA_quota,
          is_need_fix:d.is_need_fix
        }
        let instructorName: string[] = [];
        for (let instructor of d.course_instructors) {
          const user_prof = await callBackend("/api/users/" + instructor.email);
          if (user_prof) {
            const prof_data = await user_prof.json();
            instructorName.push(prof_data.user.firstName + " " + prof_data.user.lastName);
          }
        }
        item["course_instructors"] = instructorName.toString();
        courseObject.push(item);
      }
      setCourses(courseObject);
      console.log(courses)
    } catch (err) {
      console.error(err);
    }
  };


  const checkValidCourse = async () => {
    try {
      // const res = await callBackend(`/api/course/term_year=${term_year}&course_number=${course_number}`, {
      const res = await callBackend(`/api/course/${termYear}/${courseNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCourseSearchClick = async () => {

    // if (isValidFields) {
    setDisplayError(false)
    const course = await checkValidCourse();
    if (course !== null && course !== undefined) {
      setSubPage("Course");
      setCourseInfo(course);
    }
    else {
      setDisplayError(true);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div>
      {subPage === "Search" && (
        <div>
          <SearchCourse
            termYear={termYear}
            courseNumber={courseNumber}
            handleTermYear={setTermYear}
            handleCourseNumber={setCourseNumber}
            handleCourseSearchClick={handleCourseSearchClick}
            displayError={displayError}
          ></SearchCourse>

          {/* <ImportForm taskName="Courses" uploadUrl={createBackendUrl("/api/course/upload")} /> */}
          <Container className="mt-3">
            <div className="rowC">
              <h2 style={{ marginBottom: "20px" }}>Course to Fix</h2>
              {/* <AddCourseForm fetchCourseData={fetchCourseData} /> */}
            </div>
            <div id="profTable">
              <table>
                <thead>
                  <tr>
                    <th className="column0"></th>
                    <th >Course Number</th>
                    <th >Course Name</th>
                    <th >Course Type</th>
                    <th >Course Instructor</th>
                    <th >Student Enrolled</th>
                    <th >TA Quota</th>
                    <th >TA Hisotry</th>
                    <th >Manage Course</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course: Course, i: number) => (
                    <CourseRow key={i} course={course} fetchCourseData={fetchCourseData} />
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </div>
      )}

      {subPage === "Course" && (
        <div>
          <Button
            width="15rem"
            type="primary"
            value="Go Back"
            onClick={() => setSubPage("Search")}
          ></Button>
        </div>


      )
      }
    </div >
  );
};

export default ManageCourses;
