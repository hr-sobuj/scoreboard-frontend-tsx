import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommonTypes } from "../../types/commonTypes";
import axios from "axios";
import { deleteScoreUrl, getAllScoreUrl, postScoreUrl, updateScoreUrl } from "../../constants/app.constants";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

interface ScoreDeleteType {
    _id: string,
}

interface ScorePostType {
    name: string,
    b4: number,
    b6: number,
    totalRun: number,
    totalBall: number,
    role: string,
}

export interface initalStateType extends CommonTypes {
    data:
    {
        _id?: string,
        name: string,
        b4: number,
        b6: number,
        totalRun: number,
        totalBall: number,
        role: string,
    }[];
}

const initialState: initalStateType = {
    data: [],
    isLoading: false,
    error: '',
}


export const fetchScore = createAsyncThunk('score/getScore', async () => {
    try {
        const result = await axios.get(getAllScoreUrl, {
            headers: {
                'credentials': "include",
            }
        });
        if (result.status === 201) {
            return result?.data;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
});


export const postScore = createAsyncThunk('score/postScore', async (scoreObject: ScorePostType, { getState }) => {
    try {
        const state: any = getState();
        const result = await axios.post(postScoreUrl, scoreObject,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': "include",
                    Authorization: `Bearer ${state.auth.accessToken}`,
                }
            }
        );
        if (result.status === 200) {
            return result?.data?.data;
        }

    } catch (err: any) {
        throw new Error(err.message)
    }
});

export const deleteScore = createAsyncThunk('score/deleteScore', async (id: ScoreDeleteType, { getState }) => {
    try {
        const state: any = getState();
        const result = await axios.delete(deleteScoreUrl + id, {
            headers: {
                'Content-Type': 'application/json',
                'credentials': "include",
                Authorization: `Bearer ${state.auth.accessToken}`,
            }
        });

        if (result.status === 201) {
            return id;
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
});

export const updateScore = createAsyncThunk('score/updateScore', async (updatedObject: any, { getState }) => {
    try {
        const state: any = getState();
        const result = await axios.put(updateScoreUrl + updatedObject.id, updatedObject.data, {
            headers: {
                'Content-Type': 'application/json',
                'credentials': "include",
                Authorization: `Bearer ${state.auth.accessToken}`,
            }
        });
        console.log('cl', result);
        const obj = {
            id: updatedObject.id,
            data: result?.data?.data
        }
        return obj;

    } catch (error: any) {
        throw new Error(error.message)
    }
});

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScore.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchScore.fulfilled, (state, action) => {
                state.data = action.payload?.data;
                state.isLoading = false;
                state.error = '';
            })
            .addCase(fetchScore.rejected, (state, action) => {
                state.data = [{
                    _id: '',
                    name: 'string',
                    b4: 0,
                    b6: 0,
                    totalRun: 0,
                    totalBall: 0,
                    role: '',
                }];
                state.isLoading = false;
                state.error = action.error.message || '';
            })
            .addCase(postScore.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(postScore.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data.push(action.payload);
                state.isLoading = false;
                state.error = '';
            })
            .addCase(postScore.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            })
            .addCase(deleteScore.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(deleteScore.fulfilled, (state, action) => {
                state.data = state.data.filter((val) => val._id !== action.payload);
                state.isLoading = false;
                state.error = '';
            })
            .addCase(deleteScore.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            })
            .addCase(updateScore.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(updateScore.fulfilled, (state, action) => {
                const updateIndex = state.data.findIndex((val) => val._id === action.payload.id);
                state.data.splice(updateIndex, 1, action.payload.data);
                state.isLoading = false;
                state.error = '';
            })
            .addCase(updateScore.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            });
    },
});

export default scoreSlice.reducer;