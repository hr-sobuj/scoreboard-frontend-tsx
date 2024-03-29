import { CommonTypes } from "./commonTypes";

export interface AuthTypes extends CommonTypes {
    username: string,
    accessToken: string,
    role?: string,
    avatar?: string,
    id?: string
}