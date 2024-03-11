import { FC } from "react";
import { router } from "./route/router";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

export interface UserDataType {
  username: string,
  token: string
}

const App: FC = () => {
  return (
    <>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 1000,
            },
          }} />
    </>
  )
}

export default App
