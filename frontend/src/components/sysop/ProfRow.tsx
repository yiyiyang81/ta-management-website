import "../../style/userTable.css";
import { Professor } from "../../classes/Professor";
import deleteIcon from "../../assets/images/trash-icon.png";
import { ProfHelper } from "../../helpers/ProfHelper";

const ProfRow = ({
  professor,
  loadProfsData,
  loadCoursesData,
}: {
  professor: Professor;
  loadProfsData: Function;
  loadCoursesData: Function;
}) => {
  const handleDeleteProf = async () => {
    await ProfHelper.deleteProfByEmail(professor.email);
    loadProfsData();
    loadCoursesData();
  };
  
  return (

      <tr className="body">
      <td className="column0">{professor.email}</td>
      <td className="column1">{professor.firstName}</td>
      <td className="column2">{professor.lastName}</td>
      <td className="column3">{professor.faculty}</td>
      <td className="column4">{professor.department}</td>
      <td className="column5 course-button">
        <>
          {professor.hasCourse &&
            `${professor.courseNumber}: ${professor.courseName}`}
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
