import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" color="primary" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
            onClick={() => navigate("/")}
          >
            Project Hub
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button color="inherit" onClick={() => navigate("/contact")}>
              Contact
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

      {/* Drawer for mobile view */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation">
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Button fullWidth onClick={() => navigate("/about")}>
            About
          </Button>
          <Button fullWidth onClick={() => navigate("/contact")}>
            Contact
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ py: 4, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, mb: 3 }}>
          Welcome to Project Hub!
        </Typography>

        {/* Grid of Sections */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
                <Typography variant="body2" color="textSecondary">
                  Stay updated with the latest notifications and updates from projects you're involved in.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/notifications")}>View</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
                <Typography variant="body2" color="textSecondary">
                  Manage your profile, update personal information, and view your contributions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/profile")}>View</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Project Page</Typography>
                <Typography variant="body2" color="textSecondary">
                  Explore open-source projects, find new collaborators, and start contributing today.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/Project")}>Explore Projects</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Taskboard</Typography>
                <Typography variant="body2" color="textSecondary">
                  View and manage your tasks within open-source projects. Stay organized and productive.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/Taskboard")}>View</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Footer Section */}
        <Box
          sx={{
            backgroundColor: "#0288d1",
            py: 4,
            color: "#fff",
            textAlign: "center",
            mt: 6,
          }}
        >
          <Typography variant="body2" sx={{ mb: 2 }}>
            Join the open-source movement and contribute to projects that matter.
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/About")}
            sx={{
              borderRadius: "20px",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
              borderColor: "#fff",
              color: "#fff",
              "&:hover": { borderColor: "#0288d1" },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
