import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "../../style/userTable.css";
import { Professor } from "../../classes/Professor";
import { Course } from "../../classes/Course";
import deleteIcon from "../../assets/images/trash-icon.png"

const ProfRow = ({
  professor,
  loadProfsData,
}: {
  professor: Professor;
  loadProfsData: Function;
}) => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<Array<Course>>([]);

  const handleDeleteProf = () => {
    try {
      // make API call to delete prof
    } catch (e) {}
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
          <button className="courses" onClick={() => setShow(true)}>
            <OpenInFullIcon fontSize="small" /> View Courses
          </button>
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
