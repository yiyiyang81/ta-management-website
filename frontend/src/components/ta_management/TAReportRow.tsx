import React from "react";
import { TAReport } from "../../classes/TAReport";

const TAReportRow = ({ taData, fetchAllTAData }: { taData: TAReport; fetchAllTAData: Function }) => {
  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{taData.full_name}</td>
      <td className="column2">{taData.responsibilities}</td>
      <td className="column3">
        { taData.performance_logs.join(" ") }
        </td>
      <td className="column4">{taData.avg_student_rating}</td>
      <td className="column5">{taData.student_comments}</td>
    </tr>
  );
};

export default TAReportRow;
