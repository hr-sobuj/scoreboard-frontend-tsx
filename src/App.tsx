import {
  RouterProvider,
  Routes
} from "react-router-dom";
import { FC } from "react";
import { router } from "./route/router";
import { Toaster } from "react-hot-toast";

export interface UserDataType {
  username: string,
  token: string
}

const App: FC = () => {

  return (
    <div>
      <>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }} />
      </>
    </div>
  )
}

export default App
