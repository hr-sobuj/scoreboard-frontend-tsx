import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({children}:any) {
    const state=useSelector((state:any)=>state?.auth);
      console.log(state.username);
  
    return state.username!==undefined?children:<Navigate to="/" />
}