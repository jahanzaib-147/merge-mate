import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ProjectCard from "../components/Projects/ProjectCard";
import AddProject from "../components/Projects/AddProject";

const ProjectPage = () => {
  const [projects, setProjects] = useState([
    {
      title: "React Library",
      description: "A modern UI library for React.",
      image: "https://via.placeholder.com/300",
      age: "1 month",
    },
    {
      title: "AI Model",
      description: "AI model for data predictions.",
      image: "https://via.placeholder.com/300",
      age: "2 weeks",
    },
    {
      title: "E-commerce Platform",
      description: "A platform for online shopping.",
      image: "https://via.placeholder.com/300",
      age: "3 months",
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSwipeRight = (project) => {
    console.log("Liked project:", project);
  };

  const handleSwipeLeft = (project) => {
    console.log("Dismissed project:", project);
  };

  const handleRefresh = () => {
    console.log("Refreshed the project list!");
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#00457C",
          color: "#fff",
          py: 8,
          textAlign: "center",
          mb: 4,
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Welcome to the Project Hub
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Explore, swipe, and manage projects effortlessly.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              backgroundColor: "#FFA500",
              "&:hover": { backgroundColor: "#FF6347" },
            }}
          >
            Add New Project
          </Button>
        </Container>
      </Box>

      <Container>
        <Typography variant="h4" fontWeight="500" gutterBottom>
          Explore Projects
        </Typography>
        <Box sx={{ my: 4 }}>
          <ProjectCard
            projects={projects}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
            onRefresh={handleRefresh}
          />
        </Box>
      </Container>

      {/* Add Project Drawer */}
      <AddProject open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  );
};

export default ProjectPage;
