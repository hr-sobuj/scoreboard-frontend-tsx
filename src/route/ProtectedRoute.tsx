import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({auth}:any) {
    return auth!==null?<Outlet />:<Navigate to="/" />
}