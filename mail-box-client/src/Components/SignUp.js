import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const defaultTheme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword]= useState(false);
  const [conShowPassword, setConShowPassword]= useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const enteredEmail = data.get("email");
    const enteredPass = data.get("password");
    const enteredConPass = data.get("confirmpassword");

    //authenticating with firebase signup Api priject-Mail-box

    if (enteredPass !== enteredConPass) {
      alert("Password do not match");
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRx3N0KPnRdkNfNsP9EqaQbmpCDHnccS8",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Signed up Successfully");
        alert("Signed up Successfully!! Kindly login")
        navigate('/login');
        event.target.reset();
      }
    } catch (error) {
      alert(error);
    }
  };

  const toggleShowPassword=()=>{
    setShowPassword(prevState=>!prevState);
  }
  const toggleConfirmShowPassword=()=>{
    setConShowPassword(prevState=>!prevState);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Box style={{display:'flex', alignItems:'center', gap:"5px"}}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "string":"password"}
                id="password"
              />
              {!showPassword && <VisibilityOffIcon fontSize="small" onClick={toggleShowPassword}/>}
              {showPassword && <VisibilityIcon fontSize="small" onClick={toggleShowPassword}/>}
            </Box>
           
            <Box style={{display:'flex', alignItems:'center', gap:"5px"}}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label=" Confirm Password"
              type={conShowPassword ? "string":"password"}
              id="confirmpassword"
            />
            {!conShowPassword && <VisibilityOffIcon fontSize="small" onClick={toggleConfirmShowPassword}/>}
            {conShowPassword && <VisibilityIcon fontSize="small" onClick={toggleConfirmShowPassword}/>}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SignUp
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
      </Container>
    </ThemeProvider>
  );
}
