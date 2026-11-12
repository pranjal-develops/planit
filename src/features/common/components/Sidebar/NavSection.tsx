import NavElement from './NavElement'
import { GrHomeRounded } from 'react-icons/gr';
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { NavLink } from 'react-router';
import { LuLayoutDashboard } from "react-icons/lu";
import type { ReactNode } from 'react';

interface NavItems {
    id: number,
    name: string,
    button: ReactNode,
    href: '/' | '/dashboard' | '/tasks' | '/calendar'
}

const Navlinks: NavItems[]= [
    {
        id: 1,
        name: "Home",
        button: <GrHomeRounded />,
        href: "/"
    },
    {
        id: 2,
        name: "Dashboard",
        button: <LuLayoutDashboard />,
        href: "/dashboard"
    },
    {
        id: 3,
        name: "MyTasks",
        button: <IoMdCheckboxOutline />,
        href: "/tasks"
    },
    {
        id: 4,
        name: "Calendar",
        button: <IoCalendarClearOutline />,
        href: "/calendar"
    },
]

const NavSection = () => {
  return (
    <div className="pl-3">
      {Navlinks.map((link) => (
        <NavLink
          key={link.id}
          to={link.href}
          className={({ isActive }) =>
            `my-3 flex w-full items-center rounded-xl px-3 py-2 ${
              isActive
                ? "bg-(--accent-bg)/12"
                : "bg-transparent"
            }`
          }
        >
          {({ isActive }) => (
            <NavElement
              name={link.name}
              button={link.button}
              isActive={isActive}
            />
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default NavSection