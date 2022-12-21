import AddCourseForm from "./AddCourseForm";
import CourseRow from "./CourseRow";
import "../../style/userTable.css";
import { Course } from "../../classes/Course";
import ImportForm from "./ImportForm";
import { createBackendUrl } from "../../apiConfig";

const ManageCourses = (props: {
  loadCoursesData: Function;
  loadProfsData: Function;
  courses: Array<Course>;
}) => {
  console.log("COURSES", props.courses)
  return (
    <div>
      <div>
        <div className="mb-5">
          <h2>Add Courses</h2>
          <h6>Import a CSV file to add courses or manually add a course.</h6>
          <div className="d-flex flex-wrap align-items-center">
            <ImportForm
              taskName="Courses"
              uploadUrl={createBackendUrl("/api/course/upload")}
              loadFunction={props.loadCoursesData}
            />
            <div className="px-3"></div>
            <AddCourseForm loadCoursesData={props.loadCoursesData} />
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="rowC">
        <h2 style={{ marginBottom: "20px" }}>All Courses</h2>
      </div>
      <div id="profTable">
        <table>
          <thead>
            <tr>
              <th className="column0">Course Number</th>
              <th className="column1">Course Name</th>
              <th className="column2">Course Description</th>
              <th className="column3">Course Semester</th>
              <th className="column4">Course Year</th>
              <th className="column5">Course Instructors</th>
              <th className="column6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.courses.map((course: Course, i: number) => (
              <CourseRow
                key={i}
                course={course}
                loadCoursesData={props.loadCoursesData}
                loadProfsData={props.loadProfsData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
