import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { avatarUrl, loginUrl, refreshTokenUrl, registrationUrl } from "../../constants/app.constants";
import { AuthTypes } from '../../types/authTypes';
import axiosHttp from "../../utilities/axiosInterceptors";


/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/
interface UserObject {
    username: string;
    password: string;
}

const initialState: AuthTypes = {
    username: '',
    accessToken: '',
    isLoading: false,
    error: '',
    avatar: '',
    role: ''
}

/*
|--------------------------------------------------------------------------
| User Registration method
|--------------------------------------------------------------------------
*/
export const userRegistration = createAsyncThunk("auth/UserRegistration", async (userObject: UserObject) => {
    try {
        const result = await axiosHttp.post(registrationUrl, userObject);
        if (result.status === 200) {
            return result?.data;
        } else {
            throw new Error("Registration failed!");
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
});


/*
|--------------------------------------------------------------------------
| Userlogin method
|--------------------------------------------------------------------------
*/
export const userLogin = createAsyncThunk("auth/UserLogin", async (userObject: UserObject) => {
    try {
        const result = await axiosHttp.post(loginUrl, userObject);
        if (result.status === 200) {
            const userData = {
                username: userObject.username,
                token: result?.data?.token,
                avatar: result?.data?.avatar,
                role: result?.data?.role
            }
            return userData;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
});


/*
|--------------------------------------------------------------------------
| Refresh token
|--------------------------------------------------------------------------
*/
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
    try {
        const result = await axiosHttp.post(refreshTokenUrl);
        console.log(result);
    } catch (error: any) {
        throw new Error(error.message)
    }
});

/*
|--------------------------------------------------------------------------
| Avatar
|--------------------------------------------------------------------------
*/

export const postProfileAvatar = createAsyncThunk("auth/avatar", async () => {
    try {
        const result = await axiosHttp.post(avatarUrl);
        return result;
    } catch (error: any) {
        throw new Error(error.message)
    }
});


/*
|--------------------------------------------------------------------------
| Tool kit slice
|--------------------------------------------------------------------------
*/
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.username = '';
            state.accessToken = '';
            state.isLoading = false;
            state.error = '';
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.username = payload?.username ?? '';
                state.accessToken = payload?.token;
                state.isLoading = false;
                state.error = '';
                state.avatar = payload?.avatar;
                state.role = payload?.role;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? '';
                state.username = '';
                state.accessToken = '';
            })
            .addCase(postProfileAvatar.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    }
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;