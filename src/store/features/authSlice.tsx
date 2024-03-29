import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { avatarUrl, loginUrl, refreshTokenUrl, registrationUrl } from "../../constants/app.constants";
import { AuthTypes } from '../../types/authTypes';
import axiosHttp, { axiosFile } from "../../utilities/axiosInterceptors";


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
    role: '',
    id: ''
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
        console.log(result)
        if (result.status === 200) {
            const userData = {
                username: userObject.username,
                token: result?.data?.token,
                avatar: result?.data?.avatar,
                role: result?.data?.role,
                id: result?.data?.id
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

export const postProfileAvatar = createAsyncThunk(
    "auth/avatar",
    async (formObj: { id: string; formData: FormData; }, thunkAPI): Promise<any> => {
        try {
            const { id, formData } = formObj;
            const result = await axiosFile.post(avatarUrl + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'credentials': 'include'
                },
            });
            return result.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

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
                state.id = payload?.id;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? '';
                state.username = '';
                state.accessToken = '';
            })
            .addCase(postProfileAvatar.fulfilled, (state, action) => {
                state.avatar = action.payload.avatar
            });
    }
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;