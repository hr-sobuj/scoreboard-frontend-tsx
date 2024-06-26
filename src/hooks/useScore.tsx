import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/app/store";
import { fetchScore } from "../store/features/scoreSlice";
import { useGetScoreQuery } from "../store/services/scoreService";

export const useScore = () => {
    const { data, isLoading, error } = useGetScoreQuery(null);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchScore());
    }, [dispatch]);

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