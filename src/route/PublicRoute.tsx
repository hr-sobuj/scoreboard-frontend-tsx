import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicRoute({auth}:any) {
    const location=useLocation();
    console.log(location);
    return auth===null?<Outlet />:<Navigate to={location.pathname}/>;
}