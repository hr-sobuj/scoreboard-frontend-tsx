import React, { useEffect } from 'react';
import Bowler from '../components/table/Bowler';
import BatsMan from '../components/table/BatsMan';
import { fetchScore } from '../store/reducer/scoreReducer';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/nav/Navbar';


const HomePage: React.FC = () => {
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
      <div className="container mx-auto p-4 my-10">
        {isLoading && <p>Loading...</p>}
        {data.length !== 0 && (<><div className="mb-8">
          <BatsMan data={data} calculateOvers={calculateOvers} />
        </div>
          <div>
            <Bowler data={data} calculateOvers={calculateOvers} />
          </div></>)}
      </div>
    </>
  );
};

export default HomePage;
