import { FC } from "react";
import { CommonData } from "../components/common/CommonData";
import ScoreForm from "../components/form/ScoreForm";
import Navbar from "../components/nav/Navbar";

const Dashboard: FC = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-10 flex flex-col space-y-6">
                <h3 className="text-center font-bold text-4xl underline">Added New Record in Database</h3>
                <ScoreForm />
            </div>
            <div className="container mx-auto p-4 my-10 flex flex-col space-y-6">
                <CommonData />
            </div>
        </>
    )
}

export default Dashboard;