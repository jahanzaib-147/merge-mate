import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase"; 
import { addUserToFirestore } from "../../firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await addUserToFirestore(result.user);
      
      navigate("/Home"); 
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>Welcome to MergeMate</Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>Login with GitHub</Button>
    </Box>
  );
};

export default Login;
