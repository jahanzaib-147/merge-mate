import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { addUserToFirestore } from "../../firebase/firebaseHelper";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/system';


const LeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: theme.spacing(4),
  backgroundColor: '#6a5acd',
  color: 'white',
  height: '100vh',
  width: '50%',
}));

const RightSection = styled(Box)({
  backgroundColor: '#f7f7f7',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await addUserToFirestore(result.user);
      navigate("/home");
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };
  return (
    <Grid container>
      <LeftSection>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Explore open-source contributions and projects. Join the community now!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GitHubIcon />}
          sx={{
            backgroundColor: '#000000',
            textTransform: 'none',
            padding: '12px 24px',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
          onClick={handleLogin}
        >
          Login with GitHub
        </Button>
      </LeftSection>

      <RightSection>
        <img src={require("../../assets/image/mainLogin.jpg")} alt="Illustration" style={{ maxWidth: '100%', maxHeight: '80%', }} />
      </RightSection>
    </Grid>
  );
};

export default Login;
