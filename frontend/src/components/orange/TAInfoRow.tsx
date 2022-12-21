import { TA } from "../../classes/TA";

//used in second page of TA Information for basic TA info
const TAInfoRow = (
  { ta }: {
    ta: TA;
  }) => {

  return (
    <tr className="profTable">
      <td className="column0">
      </td>
      <td>{ta.student_ID}</td>
      <td>{ta.TA_name}</td>
      <td>{ta.email}</td>
      <td>{ta.average_rating}</td>
      <td>{ta.courses_assigned}</td>
      <td>{ta.courses_wishlisted}</td>
    </tr>
  );
};

export default TAInfoRow;
