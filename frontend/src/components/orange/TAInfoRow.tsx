import { TA } from "../../classes/TA";

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
    </tr>
  );
};

export default TAInfoRow;
