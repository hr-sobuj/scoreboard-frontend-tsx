import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Registration from "../pages/Registration";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    },
    {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
    },
    {
        path: '/setting',
        element: <ProtectedRoute><Settings /></ProtectedRoute>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registration',
        element: <Registration />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);