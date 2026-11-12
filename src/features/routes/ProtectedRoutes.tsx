import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import type { RootState } from '../../store/store';

type Role = "ADMIN" | "USER";

interface ProtectedRoutesProps {
    allowedRole?: Role;
}

const ProtectedRoutes:React.FC<ProtectedRoutesProps> = ({allowedRole}) => {
    const {isAuthenticated, user } = useSelector((state:RootState)=> state.auth);
    if(!isAuthenticated || !user){
        return(
            <Navigate 
            to ="/login"
            replace
            state={{ from: location.pathname }}
            />
        )
    }
    if(allowedRole && allowedRole!== user.role){
        return <Navigate to="/unauthorized" replace />
    }
  return <Outlet />
}

export default ProtectedRoutes