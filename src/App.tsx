import React, { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";

import "./App.scss";
import UserListPage from "./pages/user-list/user-list";

const About = React.lazy(() => import("./pages/about/about"));
const UserDetails = React.lazy(() =>  import("./pages/user-details/user-details"));
const NoMatch = React.lazy(() => import("./pages/not-found/not-found"));

const loader = async () => {
  return redirect("/users");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        path: "/",
        loader: loader,
        errorElement: <NoMatch />,
      },
      {
        path: "users",
        element: <UserListPage />,
        errorElement: <NoMatch />,
      },
      {
        path: "users/:userId",
        element: <UserDetails />,
        errorElement: <NoMatch />,
      },
      {
        path: "about",
        element: <About />,
      }
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <Suspense fallback={<>...</>}><RouterProvider router={router} /></Suspense>;
}
