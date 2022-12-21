import "../../style/userTable.css";
import { Professor } from "../../classes/Professor";
import deleteIcon from "../../assets/images/trash-icon.png";
import { ProfHelper } from "../../helpers/ProfHelper";

const ProfRow = ({
  professor,
  loadAllData,
}: {
  professor: Professor;
  loadAllData: Function;
}) => {
  const handleDeleteProf = async () => {
    await ProfHelper.deleteProfByEmail(professor.email);
    loadAllData();
  };
  
  return (

      <tr className="body">
      <td className="column0">{professor.email ? professor.email : '-'}</td>
      <td className="column1">{professor.firstName ? professor.firstName : 'No Last Name'}</td>
      <td className="column2">{professor.lastName ? professor.firstName : "No First Name"}</td>
      <td className="column3">{professor.faculty ? professor.faculty : "No Faculty"}</td>
      <td className="column4">{professor.department ? professor.department: "No Department"}</td>
      <td className="column5 course-button">
        <>
          {professor.hasCourse ?
            `${professor.courseNumber}: ${professor.courseName} - ${professor.termYear}` : 'No Courses'}
        </>
        </td>
        
      <td className="column6 text-center">
      <img
          src={deleteIcon}
          style={{ cursor: "pointer" }}
          height={20}
          onClick={handleDeleteProf}
        ></img>
      </td>
    </tr>
  );
};

export default ProfRow;
