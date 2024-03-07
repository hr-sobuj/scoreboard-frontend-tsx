import axios from "axios";
import { refreshTokenUrl } from "../constants/app.constants";
import { store } from "../store/store";
import { deleteScore, updateScore } from "../store/reducer/scoreReducer";

const axiosHttp = axios.create();

axiosHttp.defaults.headers.common['Content-Type'] = 'application/json';
axiosHttp.defaults.withCredentials = true;

axiosHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalUrl = error.config.url;
    const splitUrl = originalUrl.split('/');
    const sliceUrl = splitUrl.slice(6);
    const actionType = sliceUrl[1];
    const id = sliceUrl[2];
    console.log(sliceUrl);
    if (error.response.status === 401 || error.response.status === 500) {
      try {
        const result = await axiosHttp.get(refreshTokenUrl);
        const data = await result.data;
        actionType === 'delete' ? store.dispatch(deleteScore(id)) : store.dispatch(updateScore(id));
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
);

export default axiosHttp;
