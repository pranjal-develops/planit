import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/slice/authSlice";
import { NavLink, useNavigate } from "react-router";

type UserPopoverProps = {
  onClose: () => void;
};

const UserPopover = ({ onClose }: UserPopoverProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-2xl border border-(--primary-border) bg-(--background) p-2 shadow-xl"
    >
      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-xl px-3 py-2 text-left transition hover:bg-white/10"
      >
        <NavLink to="/profile">Profile</NavLink>
      </button>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-xl px-3 py-2 text-left transition hover:bg-white/10"
      >
        Settings
      </button>

      <button
        type="button"
        onClick={() => {
          // Add logout logic here
          navigate("/")
          dispatch(logout());
          onClose();
        }}
        className="w-full rounded-xl px-3 py-2 text-left text-red-400 transition hover:bg-red-400/10"
      >
        Log out
      </button>
    </motion.div>
  );
};

export default UserPopover;
