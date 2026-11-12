import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../auth/pages/Login";
import Register from "../auth/pages/Register";
import Profile from "../Home/pages/Profile";
import Calender from "../calendar/components/Calendar";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicOnlyRoutes from "./PublicOnlyRoutes";
import ProfileViewer from "../Home/pages/ProfileViewer";

import { LandingPage as LandingPage1 } from "../common/components/Landing/LandingPage";
import WithNavbar from "./WithNavbar";
import HasSidebar from "./HasSidebar";
import LandingPage from "../common/components/LandingPage/LandingPage";
import Occurrence from "../tasks/components/occurrence/Occurrence";
import Dashboard from "../dashboard/Dashboard";
import TasksPage from "../tasks/components/TasksPage";
// import TaskCreation from "../tasks/components/CreateTask/TaskCreation";
// import NewTask from "../tasks/components/CreateTask/NewTask";
// import TaskOccurrence from "../tasks/components/occurrence/TaskOccurrence";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>

        <Route element={<HasSidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/occurrence/:id" element={<Occurrence />} />
          {/* <Route path="/occurrence/:id" element={<TaskOccurrence />} /> */}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<Calender />} />
          {/* <Route path="/createTask" element={<NewTask/>}/> */}
          {/* <Route path="/createTask" element={<TaskCreation/>}/> */}

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<WithNavbar />}>
          <Route path="/u/:userName" element={<ProfileViewer />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
