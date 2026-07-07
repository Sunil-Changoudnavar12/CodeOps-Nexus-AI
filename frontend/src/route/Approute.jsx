import { Routes, Route } from "react-router-dom";
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

function Approute() {
  return (
    <Routes>
      {/* Full page auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />

      {/* Dashboard routes with sidebar + topbar */}
      <Route
        path="/"
        element={
            <Layout>
              <Overview />
            </Layout>
        }
      />

      <Route
        path="/overview"
        element={
            <Layout>
              <Overview />
            </Layout>
        }
      />

      <Route
        path="/issues"
        element={
            <Layout>
              <Issues />
            </Layout>
        }
      />

      <Route
        path="/code-review"
        element={
            <Layout>
              <CodeReview />
            </Layout>
        }
      />

      <Route
        path="/analytics"
        element={
            <Layout>
              <Analytics />
            </Layout>
        }
      />

      <Route
        path="/cicd-pipeline"
        element={
            <Layout>
              <CICD_Pipeline />
            </Layout>
        }
      />

      <Route
        path="/deployments"
        element={
            <Layout>
              <Deployments />
            </Layout>

        }
      />

      <Route
        path="/repositories"
        element={
            <Layout>
              <Repositories />
            </Layout>

        }
      />

      <Route
        path="/security"
        element={
            <Layout>
              <Security />
            </Layout>
        }
      />

      <Route
        path="/settings"
        element={
            <Layout>
              <Settings />
            </Layout>
        }
      />
    </Routes>
  );
}

export default Approute;