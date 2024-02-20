import React, { useContext, useEffect } from "react";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const { logindata, setLoginData } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goError = () => {
    navigate("*");
  };
  const goDashboard = () => {
    navigate("/dashboard");
  };
  const logoutUser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("http://localhost:8003/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/jsson",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status == 200) {
      let token = localStorage.removeItem("usersdatatoken");
      console.log("user logout");
      setLoginData(false);
      alert("logout successfully");
      navigate("/");
    } else {
      console.log("error");
    }
  };
  return (
    <header>
      <nav>
        <h1>ACCESS++</h1>

        <div className="avtar">
          {logindata.ValidUserOne ? (
            <Avatar style={{ background: "orange" }} onClick={handleClick}>
              {logindata.ValidUserOne.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              style={{ background: "blue", fontWeight: "bold" }}
              onClick={handleClick}
            >
              A
            </Avatar>
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {logindata.ValidUserOne ? (
            <>
              <MenuItem
                onClick={() => {
                  goDashboard();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutUser();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <></>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
