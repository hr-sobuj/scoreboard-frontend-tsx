
import Navbar from '../components/nav/Navbar';
import { useScore } from '../hooks/useScore';
import ShowScore from '../components/table/ShowScore';


const HomePage: React.FC = () => {

  const { isLoading, data, calculateOvers } = useScore();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 my-10">
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
  );
};

export default HomePage;
