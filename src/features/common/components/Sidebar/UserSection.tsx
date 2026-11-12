import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import UserPopover from "./UserPopover";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const UserSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = user?.banner?.startsWith("data:")
    ? user.banner
    : `data:image/png;base64,${user?.banner}`;

  if (user === null) return <>Loginn</>;

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="relative">
      <AnimatePresence>
        {isOpen && <UserPopover onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <div
      // flex min-h-32 w-full
  className="
    flex min-h-16 w-full
    items-center justify-between
    rounded-2xl
    border border-(--primary-border)
    bg-cover bg-center bg-no-repeat
    px-3 py-2
  "
  style={
    imageSrc
      ? { backgroundImage: `url("${imageSrc}")` }
      : undefined
  }
>

        <div>
          <div className="flex flex-row justify-center items-center gap-3">
            <button onClick={() => setIsOpen(!isOpen)}>
              {user.pfp ? (
                <img
                  src={user.pfp}
                  alt={`${fullName} profile`}
                  className="h-12.5 w-12.5 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 font-bold">
                  {initials}
                </div>
              )}
            </button>

            <div className="text-lg">
              {fullName}
              <div className="text-xs text-(--secondary-text)">
                @{user.username}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
