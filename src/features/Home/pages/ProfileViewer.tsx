import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { User } from '../../../types';
import { authApi } from '../../../api/AuthAPi';
import ProfilePage from '../components/ProfilePage';
import axios from 'axios';

const ProfileViewer = () => {
    const params = useParams();
    const userName = params.userName
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUser = async() => {

            if(!userName) {
                setError("Username is missing");
                setLoading(false);
                return;
            }
            try{
                setLoading(true);
                setError(null);
                const response = await authApi.getProfile(userName);
                // const {responseUser} = response.data;
                // setUser(responseUser);
                setUser(response.data)
            }   catch (err: unknown) {
                    if (axios.isAxiosError<{ message?: string }>(err)) {
                    setError(
                    err.response?.data?.message ||
                    "Failed to load user profile"
                    );
                } else {
                setError("Failed to load user profile");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [userName])
    
    if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

    if(loading) return <>Loading...</>
  return (
    <div className="h-screen overflow-auto
        ">
          <ProfilePage
          user={user}
          onEditProfile={() => console.log("Edit profile")}
        />
        </div>
  )
}

export default ProfileViewer