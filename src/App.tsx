import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {
  Routes,
  Route
} from "react-router-dom";
import { FC, useEffect, useState } from "react";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./route/ProtectedRoute";
import { useSelector } from "react-redux";

export interface UserDataType {
  username: string,
  token: string
}

const App: FC = () => {
  const userDataString = localStorage.getItem('userData');
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    setUserData(userDataString ? JSON.parse(userDataString) : null);
  }, [userDataString]);
  return (
    <>
      <Routes>
        <Route path='/' index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/*' element={<ProtectedRoute auth={userData} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
