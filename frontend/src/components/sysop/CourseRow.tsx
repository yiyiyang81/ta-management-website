import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { Course } from "../../classes/Course";
import deleteIcon from "../../assets/images/trash-icon.png";
import { CourseHelper } from "../../helpers/CourseHelper";

const CourseRow = ({
  course,
  loadAllData,
}: {
  course: Course;
  loadAllData: Function;
}) => {
  const handleDeleteCourse = async () => {
    await CourseHelper.deleteCourseByCourseNumber(course.courseNumber);
    loadAllData();
  };
  
  return (
    <tr className="body">
      <td className="column0">{course.courseNumber}</td>
      <td className="column1">{course.courseName}</td>
      <td className="column2">{course.courseDesc}</td>
      <td className="column3">{course.term}</td>
      <td className="column4">{course.year}</td>
      <td className="column5">{course.instructorNames}</td>
      <td className="column6 text-center">
        <img
          src={deleteIcon}
          style={{ cursor: "pointer" }}
          height={20}
          onClick={handleDeleteCourse}
        ></img>
      </td>
    </tr>
  );
};

export default CourseRow;
