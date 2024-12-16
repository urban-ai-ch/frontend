import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Tool from "./components/Tool";
import Input from "./components/Input";
import About from "./components/About";
import HomePage from "./components/homepage/HomePage";
import Profile from "./components/Profile";
import CheckoutForm from "./components/payment/Checkout";
import Return from "./components/payment/Return";
import { useAuth } from "./AuthContext";
import Legal from "./components/Legal";
import PricingPage from "./components/pricing/PricingPage";
import UrbanAIUploader from "./components/UrbanAIUploader";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/input"
            element={isAuthenticated ? <Input /> : <Login />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
          <Route
            path="/urban-ai"
            element={isAuthenticated ? <UrbanAIUploader /> : <Login />}
          />
          <Route path="/legal" element={<Legal />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route
            path="/checkout"
            element={isAuthenticated ? <CheckoutForm /> : <Login />}
          />
          <Route
            path="/return"
            element={isAuthenticated ? <Return /> : <Login />}
          />
          <Route
            path="/tool"
            element={isAuthenticated ? <ToolPage /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <HomePage /> : <Register />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <HomePage /> : <Login />}
          />
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
