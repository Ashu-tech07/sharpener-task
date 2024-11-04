import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MailOutlineIcon style={{ margin: 10 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to your Mail Box
          </Typography>
          <Typography>{localStorage.getItem("userEmail")}</Typography>
          {isLoggedIn && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogOut}
              sx={{ marginLeft: 5 }}
            >
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
