import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import ProfilePage from "../components/ProfilePage";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div
      className="h-screen overflow-auto
    "
    >
      {/* bg-white text-white */}
      {/* dark:bg-[oklch(0.118_0.062_110)] dark:text-white  */}
      <ProfilePage
        user={user}
        onEditProfile={() => console.log("Edit profile")}
      />
    </div>
  );
};

export default Profile;
