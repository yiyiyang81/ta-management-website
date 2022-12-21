import React, { useState } from "react";
import deleteIcon from "../../assets/images/trash-icon.png";
import { TA } from "../../classes/TA";
import { callBackend } from "../../apiConfig";

const TARow = (
  { ta, term_year, course_number, handleTAChange }: {
    ta: TA; term_year: string, course_number: string,
    handleTAChange: React.Dispatch<React.SetStateAction<any>>;
  }) => {


  const handleDeleteTA = async () => {
    try {
      const res = await callBackend(`/api/course/${term_year}/${course_number}/ta/${ta.email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        handleTAChange(true);
        alert("TA deleted successfully");
      } else {
        alert("Error while deleting TA.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <tr className="profTable">
      <td>{ta.student_ID}</td>
      <td>{ta.TA_name}</td>
      <td>{ta.email}</td>
      <td>{ta.average_rating}</td>
      <td>{ta.rating_comments}</td>
      <td>{ta.performance_logs}</td>
      <td>{ta.courses_assigned}</td>
      <td className="column0">
        <img
          src={deleteIcon}
          style={{ cursor: "pointer" }}
          height={20}
          onClick={handleDeleteTA}
        ></img>
      </td>
    </tr>
  );
};

export default TARow;
