import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginContext } from "./components/ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App() {
  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata);
  const DashboardValid = async () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("http://localhost:8003/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 401 || !data) {
      navigate("/");
    } else {
      setLoginData(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
