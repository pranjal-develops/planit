import UserProfile from "./Navbar/UserProfile";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import ThemeToggle from "./Navbar/ThemeToggle";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationBar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <header className="hidden lg:flex flex-row items-center justify-between px-5 pt-5">
      <h3 className="text-2xl text-(--primary-text)">
        Hello{" "}
        <span className="text-(--accent-bg)">
          {user !== null
            ? user.firstName
              ? user.firstName
              : user.username
            : "User"}
        </span>
      </h3>
      <section className="flex flex-row items-center gap-5">
        <div className="text-2xl">
          <IoNotificationsOutline />
        </div>
        {user && <UserProfile user={user} />}
        <ThemeToggle />
      </section>
    </header>
  );
};

export default NotificationBar;
