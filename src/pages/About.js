import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import SecurityIcon from "@mui/icons-material/Security";

const About = () => {
  const features = [
    {
      title: "Easy Collaboration",
      description: "Work together with teams and share updates in real-time.",
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    {
      title: "Powerful Tools",
      description: "Manage tasks, track progress, and measure performance.",
      icon: <BuildIcon fontSize="large" color="secondary" />,
    },
    {
      title: "Security",
      description: "Your data is safe with top-level security measures.",
      icon: <SecurityIcon fontSize="large" color="success" />,
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        About Us
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxWidth: "700px", mx: "auto", mb: 5, fontSize: "1.2rem" }}
      >
        Our platform is designed to help users easily manage and contribute to
        open-source projects. With intuitive tools and a secure environment, we
        empower teams to achieve more together.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "12px",
                p: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default About;
