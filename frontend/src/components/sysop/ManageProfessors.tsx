import AddProfForm from "./AddProfForm";
import ProfRow from "./ProfRow";
import "../../style/userTable.css";
import { Professor } from "../../classes/Professor";
import ImportForm from "./ImportForm";
import { createBackendUrl } from "../../apiConfig";

const ManageProfessors = (props: {
  loadAllData:Function;
  profs: Array<Professor>;
}) => {
  return (
    <div>
      <div className="mb-5">
        <h2>Add Professors</h2>
        <h6>
          Import a CSV file to add professors or manually add a professor.
        </h6>
        <div className="d-flex flex-wrap align-items-center">
          <ImportForm
            taskName="Professors"
            uploadUrl={createBackendUrl("/api/prof/uploadProf")}
            loadFunction={props.loadAllData}
          />
          <div className="px-3"></div>
          <AddProfForm loadProfsData={props.loadAllData} />
        </div>
      </div>
      <hr></hr>
      <div className="rowC">
        <h2 style={{ marginBottom: "20px" }}>All Professors</h2>
      </div>
        <div id="profTable">
        <table>
          <thead>
            <tr>
              <th className="column0">Email</th>
              <th className="column1">First name</th>
              <th className="column2">Last name</th>
              <th className="column3">Faculty</th>
              <th className="column4">Department</th>
              <th className="column5">Courses</th>
              <th className="column6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/**Set to hardcoded list of profs for testing purposes */}
            {props.profs.map((professor: Professor, i: number) => {
              if (professor) {
                return (
                  <ProfRow
                  key={i}
                  professor={professor}
                  loadAllData={props.loadAllData}
                  />
                  );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProfessors;
