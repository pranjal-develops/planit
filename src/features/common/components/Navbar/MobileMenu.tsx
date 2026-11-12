import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

type MobileMenuProps = {
  onClose: () => void;
};

const MobileMenu = ({ onClose }: MobileMenuProps) => {
    const {user} = useSelector((state:RootState)=>state.auth);

  return (
    <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10 lg:hidden">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Dark Theme
        </span>

        <ThemeToggle />
      </div>

      <NavLinks mobile onLinkClick={onClose} />

      {/* <UserProfile mobile /> */}
      {user && <UserProfile user={user} mobile />}
    </div>
  );
};

export default MobileMenu;
