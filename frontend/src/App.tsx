import React, {useState} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { User, emptyUser } from "./classes/User";
import LoggedOut from "./pages/LoggedOut";
import Registration from "./pages/Registration"
import AdminCourse from "./pages/AdminCourse";
import Header from "./components/Header";
import TAManagement from "./pages/TAManagement";
import { UserTypes } from "./enums/UserTypes";
import Student from "./pages/Student";
import Sysop from "./pages/Sysop";
import RateTA from "./pages/RateTA";
import SysopTasks from "./pages/SysopTasks";

interface UserProviderProps {
  user: User;
  setUser: Function;
}

export const UserContext = React.createContext<UserProviderProps>({ user: emptyUser, setUser: () => { } });

const App = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const [taskProfile, setTaskProfile] = useState("")

  return (
    <UserContext.Provider value={{ user, setUser }}>

      <Router>
        <div>
          <Header profile={taskProfile}></Header>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard setTaskProfile={setTaskProfile}/>} />
          <Route path="/logout" element={<LoggedOut />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/course" element={<AdminCourse />} />
          <Route path="/dashboard/tamanagement" element={<TAManagement />} />
          <Route path="/dashboard/student" element={<Student />} />
          <Route path="/dashboard/sysop" element={<Sysop />} />
          <Route path="/dashboard/ta-administration" element={<AdminCourse />} />
          <Route path="/dashboard/rate-ta" element={<RateTA />} />
          <Route path="/dashboard/sysop-tasks" element={<SysopTasks />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
