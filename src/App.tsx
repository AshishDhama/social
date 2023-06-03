import React, { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import UserListPage from "./pages/user-list";
import PostDetails from "./pages/post-details";

const About = React.lazy(() => import("./pages/about"));
const UserDetails = React.lazy(() =>  import("./pages/user-details"));
const NoMatch = React.lazy(() => import("./pages/not-found"));

const loader = async () => {
  return redirect("/users");
};

export const RoutesData = [
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
        path: "posts/:postId",
        element: <PostDetails />,
        errorElement: <NoMatch />,
      },
      {
        path: "about",
        element: <About />,
      }
    ],
  },
]

const router = createBrowserRouter(RoutesData);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <Suspense fallback={<>...</>}><RouterProvider router={router} /></Suspense>;
}
