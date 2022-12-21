import "../../style/userTable.css";
import ImportForm from "./ImportForm";
import { createBackendUrl } from "../../apiConfig";

const QuickImport = (props: {
  loadAllData: Function;
}) => {
  return (
    <div>
      <div>
        <div className="mb-5">
          <h2>Quick Import of Professors and Courses</h2>
          <h6>Import a CSV file to do a quick import of professors and courses.</h6>
          <div className="d-flex flex-wrap align-items-center">
            <ImportForm
              taskName="Courses and Profs"
              uploadUrl={createBackendUrl("/api/prof/uploadProfAndCourse")}
              loadFunction={props.loadAllData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickImport;
