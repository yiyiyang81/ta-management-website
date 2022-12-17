import React, { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseRow from "./CourseRow";
import "../../style/userTable.css";
import { Course } from "../../classes/Course";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";

const ManageCourses = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);

  const fetchCourseData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/course");
      const data = await res.json();
      const courseObject = [];
      for (const d of data.courses) {
        let item = {
          course_number: d.course_number,
          course_name: d.course_name,
          term_year: d.term_year,
          course_description: d.course_description,
        }
        let instructorName:string[] = [];
        for(let instructor of d.course_instructors){
          const user_prof = await fetch("http://127.0.0.1:3000/api/users/" + instructor.professor);
          if(user_prof){
            const prof_data = await user_prof.json();
            instructorName.push(prof_data.user.firstName+" "+prof_data.user.lastName);
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
    fetchCourseData();
  }, []);

  return (
    <div>
      <ImportForm taskName="Courses" uploadUrl="http://127.0.0.1:3000/api/course/upload"/>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>All Courses</h2> 
          <AddCourseForm fetchCourseData={fetchCourseData} />
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
                <th >Need to Fix</th>
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
  );
};

export default ManageCourses;
