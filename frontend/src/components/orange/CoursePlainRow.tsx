import React from "react";
import { CourseQuota } from "../../classes/CourseQuota";
import Button from "../../common/Button";

//used in Manage Course TA
const CoursePlainRow = (
  { course,
    handleCourseInfoChange,
    handleSubPageChange,
    handleCourseNumberChange,
    handleTermYearChange }:
    {
      course: CourseQuota;
      handleCourseInfoChange: React.Dispatch<React.SetStateAction<any>>;
      handleSubPageChange: React.Dispatch<React.SetStateAction<any>>;
      handleCourseNumberChange: React.Dispatch<React.SetStateAction<any>>;
      handleTermYearChange: React.Dispatch<React.SetStateAction<any>>;
    }) => {

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
      <td>
        <Button
          width="15rem"
          type="secondary"
          value="Manage"
          onClick={() => {
            handleCourseInfoChange(course);
            handleSubPageChange("Course");
            handleCourseNumberChange(course.course_number);
            handleTermYearChange(course.term_year);
          }}
        ></Button></td>
    </tr>
  );
};

export default CoursePlainRow;
