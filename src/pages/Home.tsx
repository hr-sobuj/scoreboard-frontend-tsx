import { CommonData } from '../components/common/CommonData';
import Navbar from '../components/nav/Navbar';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 my-10">
        <CommonData />
      </div>
    </>
  );
};

export default HomePage;
