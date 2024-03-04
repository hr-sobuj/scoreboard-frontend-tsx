import { FC, useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import ScoreForm from "../components/form/ScoreForm";
import BatsMan from "../components/table/BatsMan";
import Bowler from "../components/table/Bowler";
import { useDispatch, useSelector } from "react-redux";
import { fetchScore } from "../store/reducer/scoreReducer";

const Dashboard: FC = () => {
    const [localData, setLocalData] = useState([]);

    const state: any = useSelector((state: any) => state.score);

    const { data, isLoading, error } = state;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchScore());
    }, []);

    const calculateOvers = (balls: number): string => {
        const overs = Math.floor(balls / 6);
        const ballsLeft = balls % 6;
        return `${overs}.${ballsLeft}`;
    };
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-10 flex flex-col space-y-6">
                <h3 className="text-center font-bold text-4xl underline">Added New Record in Database</h3>
                <ScoreForm />
            </div>
            <div className="container mx-auto p-4 my-10 flex flex-col space-y-6">
                <div>
                    <BatsMan data={data} calculateOvers={calculateOvers} />
                </div>
                <div>
                    <Bowler data={data} calculateOvers={calculateOvers} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;