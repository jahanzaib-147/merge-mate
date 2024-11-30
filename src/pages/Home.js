import React from "react";
import { useAuth } from "../context/Auth"; 
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName || "User"}!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You are now logged in. Start exploring projects!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#000",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
