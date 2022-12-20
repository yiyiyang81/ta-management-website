import React, { useEffect, useState } from "react";
import AddTaToCourse from "./AddTaToCourse";
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


const ManageCourseTa = ({ courseNumber, setCourseNumber }: {
  courseNumber: string;
  setCourseNumber: React.Dispatch<React.SetStateAction<any>>
}) => {
  const [subPage, setSubPage] = useState("Search");

  const [courses, setCourses] = useState<Array<Course>>([]);
  const [termYear, setTermYear] = useState("default");
  // const [courseNumber, setCourseNumber] = useState("default");
  const [displayError, setDisplayError] = useState(false);
  const [courseInfo, setCourseInfo] = useState<Course>();
  const [tas, setTas] = useState<Array<TA>>([]);
  const [taChange, setTAChange] = useState(false);

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
    const fetchCurrentTAData = async () => {
      try {
        if (courseInfo) {
          const course_query = "term_year=" + courseInfo.term_year + "&course_number=" + courseInfo.course_number;
          const course_res = await callBackend(`/api/course/1/ta?` + course_query);
          const data = await course_res.json();
          let performance_logs = [];
          let courses_assigned: string[] = [];
          let average_rating = 0;
          let rating_comments = [];

          for (let ta of data.course_TA) {
            try {
              const performance_logs_res = await callBackend(`/api/performancelog/get?TA_email=` + ta.email);
              const all_logs = await performance_logs_res.json();
              for (let log of all_logs.log) {
                performance_logs = performance_logs.concat(log.time_date_stamped_comments);
              }
              ta["performance_logs"] = performance_logs.join(", ");
            }
            catch (e) {
              performance_logs = ["Not Available"];
            }

            try {
              const courses_assigned_res = await callBackend(`/api/course/ta/1?email=` + ta.email);
              const all_courses_assigned = await courses_assigned_res.json();
              for (let course of all_courses_assigned) {
                let course_info = course.course_number.concat(": ", course.term_year);
                courses_assigned.push(course_info);
              }
              ta["courses_assigned"] = courses_assigned.join(", ");
            } catch (e) {
              courses_assigned = ["Not Available"];
            }

            const ratings_res = await callBackend(`/api/ratings/${ta.email}`);
            const all_ratings = await ratings_res.json();
            for (let rating of all_ratings.ratings) {
              average_rating = average_rating + rating.rating_score;
              rating_comments.push(rating.comment);
            }
            if (all_ratings.ratings.length === 0) {
              ta["average_rating"] = -1;
              ta["rating_comments"] = ["Not Available"];
            }
            else {
              ta["average_rating"] = average_rating / all_ratings.ratings.length;
              ta["rating_comments"] = rating_comments.join(", ");
            }
          }
          setTas(data.course_TA);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentTAData();
  }, [courseInfo, taChange]);

  const checkValidCourse = async () => {
    try {
      const res = await callBackend(`/api/course/search/${termYear}/${courseNumber}`, {
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

  const handleTAChange = () => {
    taChange ? setTAChange(false) : setTAChange(true)
  }


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
                    {/* <th >TA Hisotry</th> */}
                    <th >Manage Course</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course: Course, i: number) => (
                    <CoursePlainRow
                      key={i}
                      course={course}
                      handleCourseNumberChange={setCourseNumber}
                      handleCourseInfoChange={setCourseInfo}
                      handleSubPageChange={setSubPage}
                      handleTermYearChange={setTermYear} />
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
              <AddTaToCourse
                courseNumber={courseInfo.course_number}
                termYear={courseInfo.term_year}
                handleTAChange={handleTAChange} />
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
                    <TARow key={i} ta={ta} term_year={termYear} course_number={courseNumber}
                      handleTAChange={handleTAChange} />
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
