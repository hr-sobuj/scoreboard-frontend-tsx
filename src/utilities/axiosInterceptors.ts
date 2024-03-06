import axios from "axios";
import { refreshTokenUrl } from "../constants/app.constants";

const axiosHttp = axios.create();

axiosHttp.defaults.headers.common['Content-Type'] = 'application/json';
axiosHttp.defaults.withCredentials = true;


axiosHttp.interceptors.response.use((response) => {
    return response;
},
    async (err) => {
        console.log(err.config);
        if (err.response.status === 401) {
            try {
                const result = await axiosHttp.get(refreshTokenUrl);
                const data=await result.data;
                console.log(data);
            } catch (error: any) {
                throw new Error(error.message)
            }
        }
    }
);

export default axiosHttp;