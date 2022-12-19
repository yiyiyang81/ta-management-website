import React, { useEffect, useState } from "react";
import AddCourseForm from "../sysop/AddCourseForm";
import CoursePlainRow from "./CoursePlainRow";
import "../../style/userTable.css";
import { Course } from "../../classes/Course";
import { TA } from "../../classes/TA";
import ImportForm from "../sysop/ImportForm";
import { Container } from "react-bootstrap";
import { callBackend, createBackendUrl } from "../../apiConfig";
import SearchCourse from "./SearchCourse";
import Button from "../../common/Button";
import TARow from "./TARow";


const ManageCourseTa = () => {

  const [subPage, setSubPage] = useState("Search");

  const [courses, setCourses] = useState<Array<Course>>([]);
  const [termYear, setTermYear] = useState("default");
  const [courseNumber, setCourseNumber] = useState("default");
  const [displayError, setDisplayError] = useState(false);
  const [courseInfo, setCourseInfo] = useState<Course>();
  const [tas, setTas] = useState<Array<TA>>([]);

  const fetchCourseData = async () => {
    try {
      const res = await callBackend("/api/course/", {
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
          TA_quota: d.TA_quota,
          is_need_fix: d.is_need_fix
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
    } catch (err) {
      console.error(err);
    }
  };




  useEffect(() => {
    // fetchCurrentTAData();
    const fetchCurrentTAData = async () => {
      try {
        // console.log("HEYLOO", courseInfo);
        if (courseInfo) {
          const course_query = "term_year=" + courseInfo.term_year + "&course_number=" + courseInfo.course_number;
          const course_res = await callBackend(`/api/course/1/ta?` + course_query);
          const data = await course_res.json();
          console.log("type", typeof (data.course_TA))
          for (let ta of data.course_TA) {
            console.log("ta goes here", ta)
            console.log("the email goes here haha", ta.email)

            const performance_logs_res = await callBackend(`/api/performancelog/get?TA_email=` + ta.email);
            const all_logs = await performance_logs_res.json();
            let performance_logs = [];
            for (let log of all_logs.log) {
              performance_logs = performance_logs.concat(log.time_date_stamped_comments);
            }

            const courses_assigned_res = await callBackend(`/api/course/ta/1?email=` + ta.email);
            const all_courses_assigned = await courses_assigned_res.json();
            let courses_assigned = [];
            for (let course of all_courses_assigned) {
              courses_assigned = courses_assigned.concat(course.time_date_stamped_comments);
            }
            console.log(all_courses_assigned)

            const ratings_res = await callBackend(`/api/ratings/${ta.email}`);
            const all_ratings = await ratings_res.json();
            let average_rating;
            let rating_comments = [];

            ta["performance_logs"] = performance_logs.join(", ");
            ta["courses_assigned"] = courses_assigned.join(", ");
          }
          // console.log(data.course_TA);
          setTas(data.course_TA);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentTAData();
  }, [courseInfo]);

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
      setCourseInfo(course.course);
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

          <Container className="mt-3">
            <div className="rowC">
              <h2 style={{ marginBottom: "20px" }}>Course to Fix</h2>
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
                    <CoursePlainRow key={i} course={course} fetchCourseData={fetchCourseData} />
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

          <Container className="mt-3">
            <div className="rowC">
              <h2 style={{ marginBottom: "20px" }}>Current TA</h2>
            </div>
            <div id="profTable">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="column0"></th>
                    <th >Student Number</th>
                    <th >Student Name</th>
                    <th >Email</th>
                    <th >Average Rating</th>
                    <th >Rating Comments</th>
                    <th >Performance Logs</th>
                    <th >Courses Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {tas.map((ta: TA, i: number) => (
                    <TARow key={i} ta={ta} term_year={termYear} course_number={courseNumber} />
                  ))}
                </tbody>
              </table>
            </div>
          </Container>

        </div>

      )
      }
    </div >
  );
};

export default ManageCourseTa;
