import { commonTypes } from "./commonTypes";

export interface authTypes extends commonTypes{
    username:string,
    accessToken:string,
    role?:string,
}