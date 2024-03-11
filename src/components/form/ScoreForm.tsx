import { FC, FormEvent, useState } from 'react';
import InputField from '../ui/input/InputField';
import { postScore } from '../../store/features/scoreSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/app/store';
import { CheckmarkIcon } from 'react-hot-toast';
import { customToast } from '../../utilities/customToast';
import { useCreateScoreMutation } from '../../store/services/scoreService';

interface formProps {
  pName?: string;
  pB4?: number;
  pB6?: number;
  pTotalRun?: number;
  pTotalBall?: number;
  pRole?: 'bat' | 'ball';
}

const ScoreForm: FC<formProps> = ({ pName, pB4, pB6, pTotalRun, pTotalBall, pRole }) => {
  
  let [name, setName] = useState<string>(pName || '');
  let [b4, setB4] = useState<number>(pB4 || 0);
  let [b6, setB6] = useState<number>(pB6 || 0);
  let [totalRun, setTotalRun] = useState<number>(pTotalRun || 0);
  let [totalBall, setTotalBall] = useState<number>(pTotalBall || 0);
  let [role, setRole] = useState<string>(pRole || '');

  const [createScore] = useCreateScoreMutation();

  const notify = customToast('Score updated successfully', <CheckmarkIcon />);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter player name');
      return;
    }

    if (b4 < 0 || b6 < 0 || totalRun < 0 || totalBall < 0) {
      alert('Please enter valid numbers for runs and balls');
      return;
    }

    if (!['bat', 'ball'].includes(role)) {
      alert('Please select player role');
      return;
    }

    const obj = {
      name,
      b4,
      b6,
      totalRun,
      totalBall,
      role
    };
    createScore(obj)
    notify();
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto shadow-md p-8 bg-white rounded-lg">
      <div className="mb-4">
        <InputField label="Name" type='text' placeholder='Player name' name='name' value={name} handleChange={setName} />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <InputField label="Number of 4" type='number' placeholder='Number of 4' name='b4' value={b4} handleChange={setB4} />
        </div>
        <div>
          <InputField label="Number of 6" type='number' placeholder='Number of 6' name='b6' value={b6} handleChange={setB6} />
        </div>
        <div>
          <InputField label="Total Runs" type='number' placeholder='Total Runs' name='totalRun' value={totalRun} handleChange={setTotalRun} />
        </div>
        <div>
          <InputField label="Total Balls" type='number' placeholder='Total Balls' name='totalBall' value={totalBall} handleChange={setTotalBall} />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
          Role
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select player role</option>
          <option value="bat">Batsman</option>
          <option value="ball">Bowler</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add New Record
        </button>
      </div>
    </form>
  );
};

export default ScoreForm;
