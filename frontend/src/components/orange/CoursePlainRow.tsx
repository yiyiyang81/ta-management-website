import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { Course } from "../../classes/Course";

const CoursePlainRow = ({ course, fetchCourseData }: { course: Course; fetchCourseData: Function }) => {
  
  return (
    <tr className="profTable">
      <td className="column0">

      </td>
      <td>{course.course_number}</td>
      <td>{course.course_name}</td>
      <td>{course.course_type}</td>
      <td>{course.course_instructors}</td>
      <td>{course.course_enrollment_num}</td>
      <td>{course.TA_quota}</td>
      {/* TODO: replace with meaningful URL */}
      <td><a href="/">View Details</a></td>
      <td><a href='/'>Manage</a></td>
    </tr>
  );
};

export default CoursePlainRow;
