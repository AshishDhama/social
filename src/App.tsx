import React from "react";
import {Route, Routes } from "react-router-dom";
import Layout from "./pages/dashboard/dashboard";

import "./App.css";

const Dashboard = React.lazy(() => import("./pages/user-list/user-list"));
const NoMatch = React.lazy(() => import("./pages/not-found/not-found"));


function App() {
  return (
    <>
      <Routes>
        <Route path="/user/*" />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;




