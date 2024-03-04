import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({auth}:any) {
    return auth===null?<Outlet />:<Navigate to="/dashboard" />
}