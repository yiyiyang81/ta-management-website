import React, { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseRow from "./CourseRow";
import "../../style/userTable.css";
import { Course } from "../../classes/Course";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import { callBackend, createBackendUrl } from "../../apiConfig";

const ManageCourses = (props: {
  loadCoursesData: Function;
  courses: Array<Course>;
}) => {
  return (
    <div>
      <ImportForm
        taskName="Courses"
        uploadUrl={createBackendUrl("/api/course/upload")}
        loadFunction={props.loadCoursesData}
      />
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>All Courses</h2>
          <AddCourseForm loadCoursesData={props.loadCoursesData} />
        </div>
        <div id="profTable">
          <table>
            <thead>
              <tr>
                <th className="column0"></th>
                <th className="column1">Course Number</th>
                <th className="column2">Course Name</th>
                <th className="column3">Course Description</th>
                <th className="column4">Course Semester</th>
                <th className="column5">Course Year</th>
                <th className="column6">Course Instructors</th>
              </tr>
            </thead>
            <tbody>
              {props.courses.map((course: Course, i: number) => (
                <CourseRow
                  key={i}
                  course={course}
                  loadCoursesData={props.loadCoursesData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageCourses;