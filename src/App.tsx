import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {
  Routes,
  Route
} from "react-router-dom";
import { FC } from "react";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";

interface userDataType {
  username: string,
  token: string
}

const App: FC = () => {
  const userData: userDataType = JSON.parse(localStorage.getItem('userData') || '');
  return (
    <>
      <Routes>
        {userData?.username ? (
          <>
            <Route path="/" element={<HomePage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        )}
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
