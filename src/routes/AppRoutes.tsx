import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/AuthPages/LoginPage/Login"));
const Register = lazy(() => import("../pages/AuthPages/RegisterPage/Register"));
const TaskListPage = lazy(() => import("../pages/TaskListPage/TaskListPage"));
const DashboardPage = lazy(
  () => import("../pages/DashboardPageComponent/DashboardPage")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/taskList/:projectId" element={<TaskListPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
