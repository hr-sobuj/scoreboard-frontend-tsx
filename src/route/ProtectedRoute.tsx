import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({children}:any) {
    const auth=useAuth();
    console.log(auth);
    
    return auth.username!==undefined?children:<Navigate to="/login" replace={true} />
}