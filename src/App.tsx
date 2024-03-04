import {
  RouterProvider,
  Routes
} from "react-router-dom";
import { FC } from "react";
import { router } from "./route/router";

export interface UserDataType {
  username: string,
  token: string
}

const App: FC = () => {
  return (
    <div>
      <>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </>
    </div>
  )
}

export default App
