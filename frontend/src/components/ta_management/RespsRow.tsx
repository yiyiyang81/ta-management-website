import React from "react";
import { OHResponsibilties } from "../../classes/OHResponsibilities";

const RespsRow = ({ resp, fetchRespData }: { resp: OHResponsibilties; fetchRespData: Function }) => {

  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{resp.full_name}</td>
      <td className="column2">{resp.responsibilities}</td>
    </tr>
  );
};

export default RespsRow;
