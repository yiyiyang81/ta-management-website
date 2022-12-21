import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import { createBackendUrl, callBackend } from "../../apiConfig";
import { TAReport } from "../../classes/TAReport";
import TAReportRow from "./TAReportRow";

const ViewTAReport = (props: {
    courseName: string;
}) => {

    const [allTAInfo, setTAInfo] = React.useState<Array<TAReport>>([]);

    // for each TA of the course, get their name, responsibilities, avg student rating, and student comments
    // if previously set
    const fetchAllTAData = async () => {
        try {
            const courseData = "course_number=" + props.courseName.split(" ")[0];
            const res = await callBackend("/api/course/1/ta?" + courseData);
            const data = await res.json();

            let TAInfo = new Array();

            for (const t of data.course_TA) {
              const ohrespsRes = await callBackend("/api/ohresps/get?" + courseData + "&email=" + t.email);
              const ohresps = await ohrespsRes.json();

              const avgRes = await callBackend("/api/ratings/averageScore/" + t.email + "/" + props.courseName.split(" ")[0]);
              const avg = await avgRes.json();

              const commRes = await callBackend("/api/ratings/comments/" + t.email + "/" + props.courseName.split(" ")[0]);
              const comm = await commRes.json();

              const perfLogsRes = await callBackend("/api/performancelog/coursecomments?" + courseData + "&TA_email=" + t.email);
              const perfLogs = await perfLogsRes.json()

              // define default values
              let resps = "No responsibilities yet";
              let logs = ["No recorded performance logs yet"];
              let rating = "No rating yet";
              let comments = "No comments yet"

              if (avg.averageScore !== null) {
                rating = avg.averageScore;
              }

              if (!(JSON.stringify(ohresps) === '{}')) {
                resps = ohresps.oh.responsibilities;
              }

              if (comm.comments.length != 0) {
                comments = comm.comments.join(" ");
              }

              if (!(JSON.stringify(perfLogs) === '{}')) {
                logs = perfLogs.performance_log_comments;
              }

              let item = {
                full_name: t.TA_name,
                responsibilities: resps,
                performance_logs: logs,
                avg_student_rating: rating,
                student_comments: comments,
              }
              TAInfo.push(item);
            }

            setTAInfo(TAInfo);

        }  catch (err) {
            //console.error(err);
        }
    };

  useEffect(() => {
    fetchAllTAData();
  }, [props.courseName]);

  return (
    <div>
      <Container className="mt-3">
        <div className="mb-4">
        <h1> All TAs Report </h1>
        View information about course teaching assistants.
        </div>

        <div style={{ overflow: "scroll", height: "600px" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="column0"></th>
              <th className="column1">TA Name</th>
              <th className="column2">Responsibilities</th>
              <th className="column3">Performance Logs</th>
              <th className="column4">Average Rating</th>
              <th className="column5">Student Comments</th>
            </tr>
          </thead>
          <tbody>
            {allTAInfo.map((taData: TAReport, i: number) => (
              <TAReportRow key={i} taData={taData} fetchAllTAData={fetchAllTAData} />
            ))}
          </tbody>
        </table>
        </div>
      </Container>
    </div>
  );
};

export default ViewTAReport;