import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";

const ViewTAReport = (props: {
    courseName: string;
}) => {

    const [alCourses, setAllCourses] = React.useState<Array<String>>([]);
    const allCourses = ["COMP307 Principles of Web Development", "COMP360 Algorithm Design"];

    const fetchCourseData = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3000/api/course");
            const data = await res.json();
            const getCourses = new Array();

            data.courses.forEach(c => {
                getCourses.push((c.courseNumber) + " " + c.courseName);
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
        <h1> All TAs Report </h1>
        View information about course teaching assistants.

        <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">TA Name</th>
            <th scope="col">Responsibilities</th>
            <th scope="col">Performance Logs</th>
            <th scope="col">Rating</th>
            <th scope="col">Student Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Santa Claus</th>
            <td>Bake cookies, buy a new sleigh, feed the reindeers.</td>
            <td>Brought good cookies to our weekly meetings.</td>
            <td>5.0</td>
            <td>Wholesome dude.</td>
          </tr>
          <tr>
            <th scope="row">Rudolph Reindeer</th>
            <td>Make sure other reindeers know about the meet-up spot.</td>
            <td>Good leader.</td>
            <td>4.5</td>
            <td>Answered emails within the hour.</td>
          </tr>
        </tbody>
      </table>
      </Container>
    </div>
  );
};

export default ViewTAReport;