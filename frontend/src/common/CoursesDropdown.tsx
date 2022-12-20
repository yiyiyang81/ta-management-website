import { maxWidth } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CourseHelper } from "../helpers/CourseHelper";
import Select from "./Select";

const CoursesDropdown = (props: {
  registeredCourses: string[];
  handleRegisteredCourses: React.Dispatch<React.SetStateAction<any>>;
  margin?: string 
}) => {
  const [allCourses, setAllCourses] = useState([]);
  const [allCourseNames, setAllCourseNames] = useState<string[]>([]);
  const loadCourses = async () => {
    const courses = await CourseHelper.fetchCourseNames();
    setAllCourses(courses);
    setAllCourseNames(
      courses.map((course) => `${course.courseNumber}: ${course.courseName}`)
      );
    };
   
  useEffect(() => {
    loadCourses();
  }, []);
  
  return (
    <>
      <div>
        <Select
          label="Registered Courses"
          required={false}
          name="registeredCourses"
          id="registeredCourses"
          options={allCourseNames}
          value={props.registeredCourses}
          handleChange={props.handleRegisteredCourses}
          isMultiple={true}
          margin={props.margin}
        ></Select>
      </div>
    </>
  );
};

CoursesDropdown.defaultProps = {margin: "0rem"};
export default CoursesDropdown;
