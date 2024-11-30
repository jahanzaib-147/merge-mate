import React from "react";
import { useAuth } from "../context/Auth";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            My Platform
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" onClick={() => navigate("/project")}>
              Projects
            </Button>
            <Button color="inherit" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button color="inherit" onClick={() => navigate("/contact")}>
              Contact
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Button fullWidth onClick={() => navigate("/projects")}>
            Projects
          </Button>
          <Button fullWidth onClick={() => navigate("/about")}>
            About
          </Button>
          <Button fullWidth onClick={() => navigate("/contact")}>
            Contact
          </Button>           
          <Button fullWidth onClick={() => navigate("/profile")}>Profile</Button>

          <Button fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "50vh",
          backgroundColor: "#00457C",
          color: "#fff",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome, {user?.displayName || "User"}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Explore amazing projects and manage your tasks effortlessly.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontSize: "1.1rem",
            px: 3,
            py: 1.5,
            backgroundColor: "#FF6347",
            "&:hover": {
              backgroundColor: "#FF4500",
            },
          }}
          onClick={() => navigate("/project")}
        >
          Explore Projects
        </Button>
      </Box>
      <Box
        sx={{
          py: 8,
          px: 4,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          About Our Platform
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
          Our platform is designed to help you seamlessly manage your projects and tasks. With a
          user-friendly interface and powerful features, you'll be more productive than ever.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Easy Collaboration
              </Typography>
              <Typography variant="body2">
                Work together with your team and share updates in real time.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Analytics Dashboard
              </Typography>
              <Typography variant="body2">
                Gain insights into your project progress with our advanced analytics tools.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Secure Platform
              </Typography>
              <Typography variant="body2">
                Your data is safe with us, protected by industry-standard encryption.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
