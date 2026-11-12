import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      // className=" absolute  top-2 left-0 right-0 z-50 mx-3 rounded-2xl p-4
      // className=" sticky top-2 z-50 mx-3 rounded-2xl p-4
      // className=" absolute top-2 z-50 mx-3 rounded-2xl p-4
      className=" mx-3 rounded-2xl p-4
        backdrop-blur-2xl
        bg-white/80 text-black
        dark:bg-black/80 dark:text-white
        sm:mx-6 sm:p-5
        md:mx-10
        lg:mx-15
        border-b
      "
    >
      <div className="flex items-center justify-between gap-4">
        <NavbarLogo />

        <div className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <ThemeToggle />
          {user && <UserProfile user={user} />}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

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
    </header>
  );
};

export default Navbar;
