import { Outlet } from "react-router";
import Sidebar from "../common/components/Sidebar/Sidebar";
import NotificationBar from "../common/components/NotificationBar";
import Navbar from "../common/components/Navbar/Navbar";

const HasSidebar = () => {
  return (
    // <div className="flex flex-row h-full overflow-hidden">
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex flex-col w-full h-full gap-2">
        <NotificationBar />
        <div className="lg:hidden"><Navbar/></div>
        <section className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default HasSidebar;
