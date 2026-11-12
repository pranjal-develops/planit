import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Navigate, Outlet } from 'react-router';

const PublicOnlyRoutes = () => {
    const {user} = useSelector((state: RootState) => state.auth);
    if (user) return <Navigate to="/" replace />
    
  return <Outlet />
}

export default PublicOnlyRoutes