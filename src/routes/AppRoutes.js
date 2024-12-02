import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import ProjectsPage from "../pages/ProjectsPage";
import NotificationsPage from "../pages/NotificationsPage";
import TaskBoardPage from "../pages/TaskBoard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProjectOwner from "../components/Projects/Ownerinfo/productOwner";
import Authentication from "../pages/Authentication";
import { useAuth } from "../context/Auth";
const AppRoutes = () => {
  const { user } = useAuth();
  console.log("user", user)
  return (
    <Router>
      <Routes>
        {user && user.accessToken ? (
          <>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
             <Route
              path="/project"
              element={
                <PrivateRoute>
                  <ProjectsPage />
                </PrivateRoute>
              }
            />
             <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
             <Route
              path="/task"
              element={
                <PrivateRoute>
                  <TaskBoardPage />
                </PrivateRoute>
              }
            />
             <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
             <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
                
              }
            />
              
             <Route
              path="/Ownerinfo"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
                
              }
            />
          </>
        ) : (
          <Route path="/" element={<Authentication />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
