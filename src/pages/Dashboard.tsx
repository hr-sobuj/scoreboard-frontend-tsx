import { FC, useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import ScoreForm from "../components/form/ScoreForm";
import BatsMan from "../components/table/BatsMan";
import Bowler from "../components/table/Bowler";
import { useScore } from "../hooks/useScore";

const Dashboard: FC = () => {

    const { data, calculateOvers } = useScore();

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