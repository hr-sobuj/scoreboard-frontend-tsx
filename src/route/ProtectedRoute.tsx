import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({auth}:any) {
    return auth?<Outlet />:<Navigate to="/login" />
}