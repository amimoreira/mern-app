import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Experience from "./pages/Experience/Experience";
import AddExp from "./pages/Experience/add";
import EditExp from "./pages/Experience/edit";
import About from "./pages/About/About";
import AddAbout from "./pages/About/add";
import EditAbout from "./pages/About/edit";
import Contact from "./pages/Contact/Contact";


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/add" element={<AddExp />} />
            <Route path="/experience/edit/:id" element={<EditExp />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/edit/:id" element={<EditAbout />} />
            <Route path="/about/add" element={<AddAbout />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
