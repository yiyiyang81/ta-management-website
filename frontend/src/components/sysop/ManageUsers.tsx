import "../../style/userTable.css";
import { User } from "../../classes/User";
import UserRow from "./UserRow";
import ImportForm from "./ImportForm";
import AddUserForm from "./AddUserForm";
import { createBackendUrl } from "../../apiConfig";

const ManageUsers = (props: { loadAllData: Function; users: Array<User> }) => {
  return (
    <div>
      <div className="mb-5">
        <h2>Add Users</h2>
        <h6> Import a CSV file to add users or manually add a user.</h6>
        <div className="d-flex flex-wrap align-items-center">
          <ImportForm
            taskName="Users"
            uploadUrl={createBackendUrl("/api/users/upload")}
            loadFunction={props.loadAllData}
          />
          <div className="px-3"></div>
          <AddUserForm loadUserData={props.loadAllData} />
        </div>
      </div>
      <hr></hr>
      <div className="rowC align-items-top justify-content-between">
        <h2>All Users</h2>
      </div>
      <div id="profTable">
        <table>
          <thead>
            <tr>
              <th className="column0">Email</th>
              <th className="column1">First Name</th>
              <th className="column2">Last Name</th>
              <th className="column3">User Type</th>
              <th className="column4 text-center">Edit</th>
              <th className="column5 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user: User, i: number) => {
              if (user) {
                return (
                  <UserRow
                    key={i}
                    rowUser={user}
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

export default ManageUsers;
