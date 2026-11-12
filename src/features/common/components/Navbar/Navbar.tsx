import { useState } from "react";

import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import type { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import NoUser from "./NoUser";

const Navbar = () => {
    const {user} = useSelector((state:RootState)=>state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="p-4
        border-b border-(--primary-border)
        lg:mx-5
      "
    >
      <div className="flex items-center justify-between gap-4">
        <NavbarLogo />
        {/* 
        <div className="hidden items-center gap-6 md:flex">
        </div> */}
        <div className="hidden items-center gap-6 lg:flex">
          <NavLinks />
          {user ? <UserProfile user={user}/> : <NoUser/>}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="
              rounded-lg p-2 text-2xl
              hover:bg-black/10
              dark:hover:bg-white/10
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
