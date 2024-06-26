import { FC, useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FaExclamationCircle } from 'react-icons/fa';
import { IoTrashBinSharp } from 'react-icons/io5';
import { TiDeleteOutline } from "react-icons/ti";
import { useAuth } from "../../hooks/useAuth";
import { useDeleteScoreMutation } from "../../store/services/scoreService";
import { ScoreType } from "../../types/scoreTypes";
import { Tableprops } from "../../types/tableProps";
import { customToast } from "../../utilities/customToast";
import CustomModal from "../modal/CustomModal";


const ShowScore: FC<Tableprops> = ({ name, data, calculateOvers, flag }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentScore, setCurrentScore] = useState({})

    const currentUser = useAuth();
    const [deleteScore, { isLoading }] = useDeleteScoreMutation();

    const bowlersScores: ScoreType[] = data.filter((val: any) => val?.role === 'ball');
    const batsmenScores: ScoreType[] = data?.filter((val: any) => val?.role === 'bat');

    const currentScoreShow = flag === 'bat' ? batsmenScores : bowlersScores;


    const notifyLoading = () => customToast('Loading...', <IoTrashBinSharp />)
    const notifySuccess = () => customToast('Score deleted successfully!', <CheckmarkIcon />)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal(score: any) {
        setCurrentScore(score);
        setIsOpen(true)
    }

    async function onDelete(id: any) {
        notifyLoading();
        try {
            await deleteScore(id);
            if (!isLoading) notifySuccess();
        } catch (error) {
            customToast('Operation failed!', <FaExclamationCircle />);
        }
    }


    return (
        <div>
            {isLoading && <p>Loading...</p>}
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
                                                return onDelete(score._id)
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