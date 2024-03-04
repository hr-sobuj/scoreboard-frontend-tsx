import React, { useEffect, useState } from 'react';
import Bowler from '../components/table/Bowler';
import BatsMan from '../components/table/BatsMan';
import { fetchScore } from '../store/reducer/scoreReducer';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/nav/Navbar';
import { GiConsoleController } from 'react-icons/gi';


const HomePage: React.FC = () => {
  const state: any = useSelector((state: any) => state.score);
  let [localState,setLocalState]=useState([]);
  const { data, isLoading, error } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchScore());
    setLocalState(data);
  }, []);

  useEffect(() => {
    setLocalState(state.data);
  }, [state]);

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
        {data?.length !== 0 && (<><div className="mb-8">
          <BatsMan data={localState} calculateOvers={calculateOvers} />
        </div>
          <div>
            {/* <Bowler data={localState} calculateOvers={calculateOvers} /> */}
          </div></>)}
      </div>
    </>
  );
};

export default HomePage;
