import { useSelector } from "react-redux";

export const useAuth = () => {
    const authState = useSelector((state: any) => state?.auth);
    return authState;
}