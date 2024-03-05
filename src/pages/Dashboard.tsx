import { FC } from "react";
import Navbar from "../components/nav/Navbar";
import ScoreForm from "../components/form/ScoreForm";
import { useScore } from "../hooks/useScore";
import ShowScore from "../components/table/ShowScore";

const Dashboard: FC = () => {

    const { data, isLoading, calculateOvers } = useScore();

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-10 flex flex-col space-y-6">
                <h3 className="text-center font-bold text-4xl underline">Added New Record in Database</h3>
                <ScoreForm />
            </div>
            <div className="container mx-auto p-4 my-10 flex flex-col space-y-6">
                {isLoading && <p>Loading...</p>}
                {data?.length && (
                    <>
                        <div className="mb-8">
                            <ShowScore data={data} calculateOvers={calculateOvers} flag='bat' />
                        </div>
                        <div>
                            <ShowScore data={data} calculateOvers={calculateOvers} flag='ball' />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Dashboard;