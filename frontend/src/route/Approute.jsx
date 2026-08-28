import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";
import Overview from "../pages/Overview";
import Issues from "../pages/Issues";
import CodeReview from "../pages/CodeReview";
import Analytics from "../pages/Analytics";
import CICD_Pipeline from "../pages/CICD_Pipeline";
import Deployments from "../pages/Deployments";
import Repositories from "../pages/Repositories";
import Security from "../pages/Security";
import Settings from "../pages/Settings";
import Layout from "../components";
import { isAuthenticated } from "../api/auth";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function DashboardPage({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

function Approute() {
  return (
    <Routes>
      {/* Full page auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Dashboard routes with sidebar + topbar */}
      <Route
        path="/"
        element={
          <DashboardPage>
            <Overview />
          </DashboardPage>
        }
      />

      <Route
        path="/overview"
        element={
          <DashboardPage>
            <Overview />
          </DashboardPage>
        }
      />

      <Route
        path="/dashboard"
        element={
          <DashboardPage>
            <Overview />
          </DashboardPage>
        }
      />


      <Route
        path="/issues"
        element={
          <DashboardPage>
            <Issues />
          </DashboardPage>
        }
      />

      <Route
        path="/code-review"
        element={
          <DashboardPage>
            <CodeReview />
          </DashboardPage>
        }
      />

      <Route
        path="/analytics"
        element={
          <DashboardPage>
            <Analytics />
          </DashboardPage>
        }
      />

      <Route
        path="/cicd-pipeline"
        element={
          <DashboardPage>
            <CICD_Pipeline />
          </DashboardPage>
        }
      />

      <Route
        path="/deployments"
        element={
          <DashboardPage>
            <Deployments />
          </DashboardPage>

        }
      />

      <Route
        path="/repositories"
        element={
          <DashboardPage>
            <Repositories />
          </DashboardPage>

        }
      />

      <Route
        path="/security"
        element={
          <DashboardPage>
            <Security />
          </DashboardPage>
        }
      />

      <Route
        path="/settings"
        element={
          <DashboardPage>
            <Settings />
          </DashboardPage>
        }
      />
    </Routes>
  );
}

export default Approute;

