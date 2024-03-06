import axios from "axios";

const axiosHttp = axios.create();

const root=localStorage.getItem('persist:root');
const data=JSON.parse(root)['auth'];
const auth=JSON.parse(data);

axiosHttp.defaults.headers.common['Authorization']='Bearer'+' '+auth.accessToken;
axiosHttp.defaults.headers.common['Content-Type']='application/json';
axiosHttp.defaults.withCredentials=true;

export default axiosHttp;