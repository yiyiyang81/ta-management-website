import React, {useState} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { User, emptyUser } from "./classes/User";
import LoggedOut from "./pages/LoggedOut";
import Registration from "./pages/Registration"
import AdminCourse from "./pages/AdminCourseTa";
import Header from "./components/Header";
import Student from "./pages/Student";
import Sysop from "./pages/Sysop";
import Admin from "./pages/Admin";

interface UserProviderProps {
  user: User;
  setUser: Function;
}

export const UserContext = React.createContext<UserProviderProps>({ user: emptyUser, setUser: () => { } });

const App = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const [profile, setProfile] = useState("")

  return (
    <UserContext.Provider value={{ user, setUser }}>

      <Router>
        <div>
          <Header profile={profile}></Header>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard setProfile={setProfile}/>} />
          <Route path="/logout" element={<LoggedOut />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/course" element={<AdminCourse />} />
          <Route path="/dashboard/student" element={<Student />} />
          <Route path="/dashboard/sysop" element={<Sysop />} />
          <Route path="/dashboard/ta-admin" element={<Admin />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
