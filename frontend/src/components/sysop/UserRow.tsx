import "../../style/userTable.css";
import { User } from "../../classes/User";
import { UserHelper } from "../../helpers/UserHelper";
import deleteIcon from "../../assets/images/trash-icon.png";
import EditUserForm from "./EditUserForm";
import { getDisplayedUserTypesKey } from "../../enums/UserTypes";
import { useContext } from "react";
import { UserContext } from "../../App";

const UserRow = ({
  rowUser,
  loadAllData,
}: {
  rowUser: User;
  loadAllData: Function;
}) => {
  const { user } = useContext(UserContext);
  const handleDeleteUser = async () => {
    await UserHelper.deleteUserByEmail(rowUser.email);
    loadAllData();
  };

  return (
    <tr className="body">
      <td className="column0">{rowUser.email}</td>
      <td className="column1">{rowUser.first_name}</td>
      <td className="column2">{rowUser.last_name}</td>
      <td className="column3">
        {rowUser.user_types
          .map((val) => getDisplayedUserTypesKey[val])
          .join(", ")}
      </td>
      <td className="column4">
        <EditUserForm loadAllData={loadAllData} user={rowUser}></EditUserForm>
      </td>
      <td className="column5 text-center">
        {rowUser.email !== user.email && (
          <img
            src={deleteIcon}
            style={{ cursor: "pointer" }}
            height={20}
            onClick={handleDeleteUser}
          ></img>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
