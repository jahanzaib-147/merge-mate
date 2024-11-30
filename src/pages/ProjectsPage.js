
import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import ProjectCard from "../components/Projects/ProjectCard";
import SearchBar from "../components/Projects/SearchBar"
import AddProject from "../components/Projects/AddProject";

const ProjectPage = () => {
  const [projects, setProjects] = useState([
    { title: "React Library", description: "A UI library for React.", techStack: ["React"] },
    { title: "AI Model", description: "AI model for data predictions.", techStack: ["Python"] },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSwipeRight = (project) => {
    console.log("Liked project:", project);
  };

  const handleSwipeLeft = (project) => {
    console.log("Dismissed project:", project);
  };

  const handleFilter = (filters) => {
    console.log("Filters applied:", filters);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project Page
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsDrawerOpen(true)}
        sx={{ mb: 2 }}
      >
        Add New Project
      </Button>
      <SearchBar onFilter={handleFilter} />
      <ProjectCard
        projects={projects}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
      />
      <AddProject
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Container>
  );
};

export default ProjectPage;
