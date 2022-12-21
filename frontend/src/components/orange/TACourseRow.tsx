import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { CourseQuota } from "../../classes/CourseQuota";

const TACourseRow = ({ course, loadCoursesData }: { course: CourseQuota; loadCoursesData: Function }) => {
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
      <td>{course.course_enrollment_num}</td>
      <td>{course.TA_quota}</td>
      {/* TODO: replace with meaningful URL */}
      <td><a href="/">View Details</a></td>
      <td><a href='/'>Manage</a></td>
    </tr>
  );
};

export default TACourseRow;
