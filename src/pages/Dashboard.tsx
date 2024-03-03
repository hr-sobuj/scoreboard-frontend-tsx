import { FC } from "react";
import Navbar from "../components/nav/Navbar";
import ScoreForm from "../components/form/ScoreForm";

const Dashboard: FC = () => {
    return (
        <>
            <Navbar/>
            <ScoreForm/>
        </>
    )
}

export default Dashboard;