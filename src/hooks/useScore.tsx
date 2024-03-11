import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/app/store";
import { useEffect } from "react";
import { fetchScore } from "../store/features/scoreSlice";
import { useGetScoreQuery } from "../store/services/scoreService";

export const useScore = () => {
    const { data, isLoading, error } = useGetScoreQuery();

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