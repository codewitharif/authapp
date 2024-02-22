import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [passCShow, setCPassShow] = useState(false);
  const [error, setError] = useState(""); // State for displaying validation error

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpval;
    console.log(fname, email, password, cpassword);
    try {
      // Check if passwords match
      if (password !== cpassword) {
        setError("Passwords do not match");
        return;
      } else {
        const data = await fetch("https://authappserver.vercel.app/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            email,
            password,
            cpassword,
          }),
        });

        const res = await data.json();
        if (res.status === 201) {
          alert("account created successfully!");
          setInpval({
            ...inpval,
            fname: "",
            email: "",
            password: "",
            cpassword: "",
          });
          navigate("/");
        }
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }

    // If validation passes, you can proceed with form submission
    // Reset error state
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Signup</h1>
            <p>We will store your data safely</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={setVal}
                value={inpval.fname}
                placeholder="Enter your Name"
                required={true}
              />
            </div>

            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={setVal}
                value={inpval.email}
                placeholder="Enter your Email Address"
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
                  onChange={setVal}
                  value={inpval.password}
                  placeholder="Enter your Password"
                  required={true}
                  minLength={6}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="cpassword">Confirm Password</label>
              <div className="two">
                <input
                  type={!passCShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  onChange={setVal}
                  value={inpval.cpassword}
                  placeholder="Confirm Password"
                  required={true}
                  minLength={6}
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!passCShow)}
                >
                  {!passCShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="btn" onClick={addUserdata}>
              Sign up
            </button>
            <p>
              Already have an account?<Link to="/"> Log in</Link>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
