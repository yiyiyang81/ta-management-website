import { TA } from "../../classes/TA";

const TAPlainRow = (
  { ta, course_number }: {
    ta: TA; course_number: string
  }) => {

  return (
    <tr className="profTable">
      <td className="column0">
      </td>
      <td>{ta.term_year}</td>
      <td>{ta.student_ID}</td>
      <td>{ta.TA_name}</td>
      <td>{ta.email}</td>
      <td>{ta.average_rating}</td>
      <td>{ta.rating_comments}</td>
      <td>{ta.performance_logs}</td>
    </tr>
  );
};

export default TAPlainRow;
