import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import { createBackendUrl, callBackend } from "../../apiConfig";

const ChooseCourse = (props: {
    handleCourse: React.Dispatch<React.SetStateAction<any>>;
    courseName: string;
}) => {

    const [allCourses, setAllCourses] = React.useState<Array<String>>([]);

    const fetchCourseData = async () => {
        try {
            const courseData = "'email'='santa@email.com'"; // TODO: retrieve from user
            const url = createBackendUrl("/api/course/prof/1?" + courseData);
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
    <div>
      <Container className="mt-3">
        <h1> Select a Course </h1>
        Access TA management features by first selecting a course.
        <div style={{width: "40%"}}>
            <Select
                label=""
                required={true}
                name="course"
                id="course"
                options={allCourses}
                value={props.courseName}
                handleChange={props.handleCourse}
            ></Select>
        </div>
      </Container>
    </div>
  );
};

export default ChooseCourse;