import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchScore } from "../store/reducer/scoreReducer";

export const useScore = () => {
    const state: any = useSelector((state: any) => state.score);

    const { data, isLoading, error } = state;

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchScore());
    }, []);

    const calculateOvers = (balls: number): string => {
        const overs = Math.floor(balls / 6);
        const ballsLeft = balls % 6;
        return `${overs}.${ballsLeft}`;
    };

    return {
        data,
        isLoading,
        error,
        calculateOvers
    }
}