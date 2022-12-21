import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import { createBackendUrl, callBackend } from "../../apiConfig";

const ChooseCourse = (props: {
    handleCourse: React.Dispatch<React.SetStateAction<any>>;
    isInstructor: boolean;
    courseName: string;
    userEmail: string;
}) => {

    const [allCourses, setAllCourses] = React.useState<Array<String>>([]);

    const fetchCourseData = async () => {
        try {
            const courseData = "email=" + props.userEmail; 

            let url = "";
            if (props.isInstructor) {
              url = createBackendUrl("/api/course/prof/1?" + courseData);
              
            } else {
              url = createBackendUrl("/api/course/ta/1?" + courseData);
            }

            const res = await callBackend(url);
          
            const data = await res.json();
            const getCourses = new Array();

            data.forEach(c => {
                getCourses.push((c.course_number) + " " + c.course_name);
            });

            setAllCourses(getCourses);
            
        }  catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
      fetchCourseData();
    }, []);

  return (
      <Container className="mt-3">
        <div className="mb-4">
        <h1> Select a Course </h1>
        Access TA management features by first selecting a course.
        </div>
        <div style={{width: "40%"}}>
            <Select
                label="Course"
                required={true}
                name="course"
                id="course"
                placeholder="Select a Course"
                options={allCourses}
                value={props.courseName}
                handleChange={props.handleCourse}
            ></Select>
        </div>
      </Container>
  );
};

export default ChooseCourse;