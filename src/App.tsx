import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/login";
import Register from "./components/register";
import Contact from "./components/contact";
import Tool from "./components/tool";
import Code from "./components/code";
import About from "./components/about";
import HomePage from "./components/HomePage";
import { useAuth } from "./AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/code" element={<Code />} />
          <Route path="/about" element={<About />} />
          {isAuthenticated ? (
            <Route path="/tool" element={<ToolPage />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
}

const ToolPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");

  return <Tool defaultLocation={location || "Zurich"} />;
};

export default App;
