import { FC, useEffect, useState } from "react";
import { ScoreType } from '../../types/scoreTypes';
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { UserDataType } from "../../App";


interface BatsManProps {
    data: any,
    calculateOvers: any
}

const BatsMan: FC<BatsManProps> = ({ data, calculateOvers }) => {

    const userDataString = localStorage.getItem('userData');
    const [userData, setUserData] = useState<UserDataType | null>(null);

    useEffect(() => {
        setUserData(userDataString ? JSON.parse(userDataString) : null);
    }, [userDataString]);

    const batsmenScores: ScoreType[] = data.filter((val: any) => val.role === 'bat')

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-4">Batsmen Scoreboard</h2>
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
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            {userData && (<th className="border border-gray-300 px-4 py-2">Actions</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {batsmenScores?.map((score: any) => (
                            <tr key={score._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{score.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.b4}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.b6}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.totalRun}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.totalBall}</td>
                                <td className="border border-gray-300 px-4 py-2">{calculateOvers(score.totalBall)}</td>
                                <td className="border border-gray-300 px-4 py-2">{score.role}</td>
                                {userData && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex space-x-3 justify-center items-center">
                                            <button>
                                                <CiEdit className="w-6 h-6 text-lime-900" />
                                            </button>
                                            <button>
                                                <TiDeleteOutline className="w-6 h-6 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BatsMan;