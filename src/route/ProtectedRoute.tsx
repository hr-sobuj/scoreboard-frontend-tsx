import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({children}:any) {
    const state=useSelector((state:any)=>state?.auth);
      console.log(state.username.length);
  
    return state!==null?children:<Navigate to="/" />
}