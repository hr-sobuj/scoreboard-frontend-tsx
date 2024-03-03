import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonTypes } from "../../types/commonTypes";
import axios from "axios";
import { getAllScoreUrl, postScoreUrl } from "../../constants/app.constants";


export interface initalStateType extends commonTypes {
    data: [
        {
            _id?: string,
            name: string,
            b4: number,
            b6: number,
            totalRun: number,
            totalBall: number,
            role: string,
        }
    ]
}

const initialState: initalStateType = {
    data: [
        {
            _id: '',
            name: 'string',
            b4: 0,
            b6: 0,
            totalRun: 0,
            totalBall: 0,
            role: '',
        }
    ],
    isLoading: false,
    error: '',
}

export const fetchScore = createAsyncThunk('score/getScore', async () => {
    try {
        const result = await axios.get(getAllScoreUrl);
        if (result.status === 201) {
            return result?.data;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
});


export const postScore = createAsyncThunk('score/postScore', async (scoreObject: initalStateType) => {
    try {
        const result = await axios.post(postScoreUrl, scoreObject);
    } catch (err: any) {
        throw new Error(err.message)
    }
});

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchScore.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        });
        builder.addCase(fetchScore.fulfilled, (state, { payload: { data } }) => {
            state.data = data;
            state.isLoading = false;
            state.error = '';
        });
        builder.addCase(fetchScore.rejected, (state, action) => {
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
        });
    },
});

export default scoreSlice.reducer;