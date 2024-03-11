import { FC, useState } from "react";
import { ScoreType } from "../../types/scoreTypes";
import { Tableprops } from "../../types/tableProps";
import { useDispatch } from "react-redux";
import { CiEdit } from "react-icons/ci";
import CustomModal from "../modal/CustomModal";
// import { deleteScore } from "../../store/features/scoreSlice";
import { TiDeleteOutline } from "react-icons/ti";
import { AppDispatch } from "../../store/app/store";
import { IoTrashOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { customToast } from "../../utilities/customToast";
import { useDeleteScoreMutation } from "../../store/services/scoreService";


const ShowScore: FC<Tableprops> = ({ name, data, calculateOvers, flag }: any) => {
    let [isOpen, setIsOpen] = useState(false);
    const [currentScore, setCurrentScore] = useState({})

    const currentUser = useAuth();
    const [deleteScore] = useDeleteScoreMutation();

    const bowlersScores: ScoreType[] = data.filter((val: any) => val?.role === 'ball');
    const batsmenScores: ScoreType[] = data?.filter((val: any) => val?.role === 'bat');

    const currentScoreShow = flag === 'bat' ? batsmenScores : bowlersScores;

    const dispatch = useDispatch<AppDispatch>();
    const notify = () => customToast('Score is deleted!', <IoTrashOutline />)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(score: any) {
        setCurrentScore(score);
        setIsOpen(true)
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-4">{name} Scoreboard</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Number of 4</th>
                            <th className="border border-gray-300 px-4 py-2">Number of 6</th>
                            <th className="border border-gray-300 px-4 py-2">Total Runs</th>
                            <th className="border border-gray-300 px-4 py-2">Total Balls</th>
                            <th className="border border-gray-300 px-4 py-2">Overs</th>
                            {currentUser.username && (<th className="border border-gray-300 px-4 py-2">Actions</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {currentScoreShow?.map((score: any) => (
                            <tr key={score._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{score.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.b4}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.b6}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.totalRun}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.totalBall}</td>
                                <td className="border border-gray-300 px-4 py-2">{calculateOvers(score.totalBall)}</td>
                                {currentUser.username && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex space-x-3 justify-center items-center">
                                            <button onClick={() => {
                                                openModal(score);
                                            }}>
                                                <CiEdit className="w-6 h-6 text-lime-900" />
                                            </button>
                                            <button onClick={() => {
                                                // const isDelete = confirm('Are you sure to delete?');
                                                const isDelete = true;
                                                if (isDelete) {
                                                    deleteScore(score._id);
                                                    notify();
                                                }
                                            }}>
                                                <TiDeleteOutline className="w-6 h-6 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CustomModal isOpen={isOpen} closeModal={closeModal} score={currentScore} />
            </div>
        </div>
    )
}

export default ShowScore;