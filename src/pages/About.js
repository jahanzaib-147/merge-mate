import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Our platform is designed to help users easily manage and contribute to open-source projects. With intuitive project browsing, task management, and collaboration tools, we help you get the job done more efficiently.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
            <Typography variant="h6">Easy Collaboration</Typography>
            <Typography variant="body2">
              Work together with teams and share updates in real-time.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
            <Typography variant="h6">Powerful Tools</Typography>
            <Typography variant="body2">
              Manage tasks, track progress, and measure performance with built-in tools.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}>
            <Typography variant="h6">Security</Typography>
            <Typography variant="body2">
              Your data is safe with us, protected by top-level security measures.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
