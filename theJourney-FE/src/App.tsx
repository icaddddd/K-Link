import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import CustEdit from "./pages/CustEdit";

function App() {
  const loginSession = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSession) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [])
  
  return (
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/updatecustomer/:id" element={<CustEdit />} />
      </Routes>
  );
}

export default App;
