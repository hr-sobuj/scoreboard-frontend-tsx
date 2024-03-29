import axios from "axios";
const axiosHttp = axios.create();

axiosHttp.defaults.headers.common['Content-Type'] = 'application/json';
axiosHttp.defaults.withCredentials = true;

export const axiosFile = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


export default axiosHttp;
