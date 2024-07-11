import React, { useState } from "react";
import axios from "axios";
import { getToken, setToken, setUserid } from "../../session";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Checklist from "../../assets/img/checklist.png";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "/user/login",
        {
          email: username,
          password: password,
        }
      );

      if (response.data.token) {
        setToken(response.data.token);
        setUserid(response.data.userId);
        setLoginError("");

        console.log("Token set: ", getToken());

        if (getToken()) {
          navigate("/home");
        }
      } else {
        setLoginError(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoginError(error.response?.data?.error || "Server error");
    }
    console.log(username);
    console.log(password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton>
          <img src={Checklist} width={25} height={25} alt="Checklist" />
        </IconButton>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setUsername(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => {
              submitLogin(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
                submitLogin(e); // Call submitLogin function
              }
            }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Create Account
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
