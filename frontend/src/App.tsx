import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { User, emptyUser } from "./classes/User";
import LoggedOut from "./pages/LoggedOut";
import Registration from "./pages/Registration"
import Header from "./components/Header";
import Admin from "./pages/Admin";
import RateTA from "./pages/RateTA";
import SysopTasks from "./pages/SysopTasks";

interface UserProviderProps {
  user: User;
  setUser: Function;
}

export const UserContext = React.createContext<UserProviderProps>({
  user: emptyUser,
  setUser: () => {},
});

const App = () => {
  const getUserInitialState = () => {
    const storageUser = localStorage.getItem("user");
    return storageUser ? JSON.parse(storageUser) : emptyUser;
  };

  const getTaskProfileInitialState = () => {
    const storageTaskProfile = localStorage.getItem("taskProfile");
    return storageTaskProfile ? storageTaskProfile : "";
  };
  const [user, setUser] = useState<User>(getUserInitialState);
  const [taskProfile, setTaskProfile] = useState(getTaskProfileInitialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("taskProfile", taskProfile);
  }, [user, taskProfile]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div>
          <Header profile={taskProfile}></Header>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dashboard setTaskProfile={setTaskProfile} />}
          />
          <Route path="/logout" element={<LoggedOut />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard/ta-administration" element={<Admin />} />
          <Route path="/dashboard/rate-ta" element={<RateTA />} />
          <Route path="/dashboard/sysop-tasks" element={<SysopTasks />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
