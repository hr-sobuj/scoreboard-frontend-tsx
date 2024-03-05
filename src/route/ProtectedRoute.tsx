import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({children}:any) {
    const auth=useAuth();
    return auth.username?children:<Navigate to="/login" replace={true} />
}