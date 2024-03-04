import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicRoute({auth}:any) {
    // const location=useLocation();
    // if(location.pathname==='/login' || location.pathname==='/registration'){
    //     return <Navigate to="/" />
    // }
    return auth===null?<Outlet />:<Navigate to={location.pathname}/>;
}