import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { OHResponsibilties } from "../../classes/OHResponsibilities";

const OHRow = ({ oh, fetchOHData }: { oh: OHResponsibilties; fetchOHData: Function }) => {

  return (
    <tr className="body">
      <td className="column1">{oh.full_name}</td>
      <td className="column2">{oh.office_hours}</td>
    </tr>
  );
};

export default OHRow;
