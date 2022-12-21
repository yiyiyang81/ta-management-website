import React from "react";
import { OHResponsibilties } from "../../classes/OHResponsibilities";

const OHRow = ({ oh, fetchOHData }: { oh: OHResponsibilties; fetchOHData: Function }) => {

  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{oh.full_name}</td>
      <td className="column2">{oh.office_hours}</td>
      <td className="column3">{oh.location}</td>
    </tr>
  );
};

export default OHRow;
