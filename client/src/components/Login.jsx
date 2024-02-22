import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  console.log(inpval);

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    const data = await fetch("https://authappserver.vercel.app/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res = await data.json();
    if (res.status === 200) {
      alert("login successfully!");
      localStorage.setItem("usersdatatoken", res.result.token);
      setInpval({ ...inpval, email: "", password: "" });
      navigate("/dashboard");
      console.log("login success", res);
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Login</h1>
            <p>We are glad, you are back</p>
          </div>
          <form onSubmit={loginUser}>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email Address"
                onChange={setVal}
                value={inpval.email}
                required={true}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  required={true}
                  onChange={setVal}
                  value={inpval.password}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" type="submit">
              Login
            </button>
            <p>
              Don't have an account?<Link to="/register"> Sign up</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
