import Bowler from '../components/table/Bowler';
import BatsMan from '../components/table/BatsMan';
import Navbar from '../components/nav/Navbar';
import { useScore } from '../hooks/useScore';


const HomePage: React.FC = () => {

  const { isLoading, data, calculateOvers } = useScore();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 my-10">
        {isLoading && <p>Loading...</p>}
        {data?.length && (<><div className="mb-8">
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
