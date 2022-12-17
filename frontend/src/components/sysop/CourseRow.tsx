import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { Course } from "../../classes/Course";

const CourseRow = ({ course, fetchCourseData }: { course: Course; fetchCourseData: Function }) => {
  const handleDeleteCourse = () => {
    console.log("Delete course");
  };

  return (
    <tr className="profTable">
      <td className="column0">
        <button className="btn btn-secondary" onClick={handleDeleteCourse}>
          <RemoveIcon />
        </button>
      </td>
      <td>{course.course_number}</td>
      <td>{course.course_name}</td>
      <td>{course.course_type}</td>
      <td>{course.course_instructors}</td>
      <td>{course.course_enrolllment_num}</td>
      <td>{course.TA_quota}</td>
      <td>{course.is_need_fix}</td>
      {/* TODO: replace with meaningful URL */}
      <td><a href="/">View Details</a></td>
      <td><a href='/'>Manage</a></td>
    </tr>
  );
};

export default CourseRow;
