import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata);
  const navigate = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://authappserver.vercel.app/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      credentials: "include",
    });

    const data = await res.json();

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
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Welcome back,{" "}
        <b>{logindata.ValidUserOne && logindata.ValidUserOne.fname}</b>!
        Registered Email :{" "}
        <b>{logindata.ValidUserOne && logindata.ValidUserOne.email}</b>
      </p>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        🎉 Explore new features & reach out if you need help.
        <br /> Enjoy your time with us! -
        <br />
        ExtraSecure Team 🚀
      </p>
    </>
  );
};

export default Dashboard;
