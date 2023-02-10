import React, { useEffect } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import { callBackend } from "../../apiConfig";
import { UserTypes } from "../../enums/UserTypes";

const ChooseCourse = (props: {
    handleCourse: React.Dispatch<React.SetStateAction<any>>;
    currentProfile: UserTypes;
    isInstructor: boolean;
    courseName: string;
    userEmail: string;
}) => {

    const [allCourses, setAllCourses] = React.useState<Array<String>>([]);

    // get all courses TA/prof is associated with
    // goal: prof/TA can only select a course they're involved with
    const fetchCourseData = async () => {
        try {
          if (props.currentProfile === UserTypes.Admin || props.currentProfile === UserTypes.Sysop) {
            // get all current courses
            const res = await callBackend("/api/course");
            const data = await res.json();

            let currentCourses = [];
            data.courses.forEach( c => {
              currentCourses.push((c.course_number) + " " + c.course_name);
            })
            setAllCourses(currentCourses);

          } else {
            const courseData = "email=" + props.userEmail;

            let url = "";
            if (props.isInstructor) {
              url = "/api/course/prof/1?" + courseData;
            } else {
              url = "/api/course/ta/1?" + courseData;
            }

            const res = await callBackend(url);
            const data = await res.json();

            const getCourses = [];
            data.forEach(c => {
                getCourses.push((c.course_number) + " " + c.course_name);
            });
            setAllCourses(getCourses);

          }
        }  catch (err) {
            //console.error(err);
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