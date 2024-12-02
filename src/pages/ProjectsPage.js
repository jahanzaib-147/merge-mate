import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Divider,
  Paper,
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

  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "#fff",
          py: 8,
          textAlign: "center",
          mb: 4,
          borderBottom: "5px solid #3B82F6",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to Project Hub: Empowering Open-Source Collaboration
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
          Open Source, Open Doors: Start Your Collaboration No          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              backgroundColor: "#3B82F6",
              "&:hover": { backgroundColor: "#2563EB" },
              px: 4,
              py: 2,
              fontSize: "1.1rem",
            }}
          >
            Add New Project
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Container>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="600"
            gutterBottom
            sx={{
              borderBottom: "2px solid #3B82F6",
              pb: 1,
              mb: 3,
              color: "#1E293B",
            }}
          >
            Explore Projects
          </Typography>
          <Box sx={{ my: 4 }}>
            {projects.length > 0 ? (
              <ProjectCard
                projects={projects}
                onSwipeRight={handleSwipeRight}
                onSwipeLeft={handleSwipeLeft}
                onRefresh={handleRefresh}
              />
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                No projects to display. Click "Add New Project" to start.
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Add Project Drawer */}
      <AddProject
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAddProject={handleAddProject} // Pass handler to add new project
      />
    </Box>
  );
};

export default ProjectPage;
