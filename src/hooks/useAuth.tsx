import { useSelector } from "react-redux";
// import { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie';

export const useAuth = () => {
    // # react cookie not work
    // const [cookies,setCookies,removeCookies]=useCookies(['scoreboard']);
    // console.log(cookies);
    // let cookiess=Cookies.get('scoreboard');
    // console.log(cookiess);
    const authState = useSelector((state: any) => state?.auth);
    return authState;
}