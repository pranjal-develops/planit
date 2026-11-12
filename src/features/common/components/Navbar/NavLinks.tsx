import { NavLink } from "react-router";
import RollingText from "../../Primitives/RollingText";

type NavLinksProps = {
  mobile?: boolean;
  onLinkClick?: () => void;
};

const NavLinks = ({ mobile = false, onLinkClick }: NavLinksProps) => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/Tasks" },
    { label: "Calendar", href: "/calendar" },
    // { label: "Profile", href: "/profile" },
  ];

  return (
    <nav className={mobile ? "flex flex-col gap-4" : "hidden items-center gap-6 md:flex"}>
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          onClick={onLinkClick}
          // className="transition hover:text-lime-500 group inline-flex items-center"
        >
          <RollingText text={link.label}/>
        </NavLink>
      ))}
{/* 
      <button
        type="button"
        onClick={onLinkClick}
        className="text-left transition hover:text-red-500"
      >
        Logout
      </button> */}
    </nav>
  );
};

export default NavLinks;
