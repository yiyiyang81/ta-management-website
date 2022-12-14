import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { User, emptyUser } from "./classes/User";
import LoggedOut from "./pages/LoggedOut";
import Registration from "./pages/Registration"
import AdminCourse from "./pages/AdminCourse";
import Header from "./components/Header";

interface UserProviderProps {
  user: User;
  setUser: Function;
}

export const UserContext = React.createContext<UserProviderProps>({ user: emptyUser, setUser: () => { } });

const App = () => {
  const [user, setUser] = React.useState<User>(emptyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>

      <Router>
        <div>
          <Header></Header>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<LoggedOut />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/course" element={<AdminCourse />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
