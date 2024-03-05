import { useSelector } from "react-redux";
import { refreshTokenUrl } from "../constants/app.constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface AuthDataType {
    accessToken?: string,
    username?: string
}

export const useAuth = () => {
    const [auth, setAuth] = useState<AuthDataType>({});
    useEffect(() => {
        async function fecthData() {
            let result: any = await axios.get(refreshTokenUrl, {
                headers: {
                    'credentials': "include",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken') || '')}`,
                }
            });
            setAuth(result?.data);
        }
        fecthData();
    }, []);

    const isAuth = auth?.accessToken ? auth?.username : false;
    return useSelector((state: any) => state?.auth) || isAuth;
}