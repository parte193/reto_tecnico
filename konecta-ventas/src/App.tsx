import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import SalesManagementPage from "./pages/SalesManagementPage";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? <UserManagementPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/sales"
        element={
          isAuthenticated ? <SalesManagementPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
