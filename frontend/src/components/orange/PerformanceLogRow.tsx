import { PerformanceLog } from "../../classes/PerformanceLog";

//used in second page of TA Information
const PerformanceLogRow = (
    { performance_log }: {
        performance_log: PerformanceLog;
    }) => {

    return (
        <tr className="profTable">
            <td className="column0">
            </td>
            <td>{performance_log.term_year}</td>
            <td>{performance_log.comment}</td>
        </tr>
    );
};

export default PerformanceLogRow;
