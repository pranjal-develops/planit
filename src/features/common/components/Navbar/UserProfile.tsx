import type { User } from "../../../../types";

type UserProfileProps = {
  user: User
  mobile?: boolean;
};

const UserProfile = ({user,  mobile = false }: UserProfileProps) => {
  // const { user } = useSelector((state: RootState) => state.auth);

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;

  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={
        mobile
          ? "flex items-center gap-3 border-t border-black/10 pt-4 dark:border-white/10"
          : "hidden items-center gap-3 md:flex"
      }
    >
      {user.pfp ? (
        <img
          src={user.pfp}
          alt={`${fullName} profile`}
          className="h-10 w-10 rounded-xl object-cover"
        />
      ) : (
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 font-bold">
          {initials}
        </div>
      )}

      {/* <span className="max-w-32 truncate">{fullName}</span> */}
    </div>
  );
};

export default UserProfile;
