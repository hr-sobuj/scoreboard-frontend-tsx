import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authTypes } from '../../types/authTypes';
import axios from "axios";
import { LoginUrl, RegistrationUrl } from "../../constants/app.constants";


/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/
interface UserObject {
    username: string;
    password: string;
}

const initialState: authTypes = {
    username: '',
    accessToken: '',
    isLoading: false,
    error: '',
}


/*
|--------------------------------------------------------------------------
| User Registration method
|--------------------------------------------------------------------------
*/
export const userRegistration = createAsyncThunk("auth/UserRegistration", async (userObject: UserObject) => {
    try {
        const result = await axios.post(RegistrationUrl, userObject, {
            headers: {
                'credentials': "include",
            }
        });
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
        const result = await axios.post(LoginUrl, userObject, {
            headers: {
                'credentials': "include",
            }
        });
        if (result.status === 200) {

            const userData = {
                username: userObject.username,
                token: result?.data?.token,
            }
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('accessToken', JSON.stringify(result?.data?.token));
            return userData;
        }
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
                state.username = payload?.username || '';
                state.accessToken = payload?.token;
                state.isLoading = false;
                state.error = '';
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
                state.username = '';
                state.accessToken = '';
            });
    }
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;