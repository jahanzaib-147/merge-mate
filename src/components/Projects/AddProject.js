import React, { useState } from "react";
import { addProject } from "../../firebase/firebaseHelper";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleAddProject = async () => {
    const newProject = {
      name,
      description,
      techStack: techStack.split(",").map((tech) => tech.trim()),
      difficulty,
    };
    await addProject(newProject);
    alert("Project added successfully!");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Add New Project</Typography>
      <TextField
        label="Project Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Tech Stack (comma-separated)"
        fullWidth
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Difficulty Level"
        fullWidth
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddProject}>
        Add Project
      </Button>
    </Box>
  );
};

export default AddProject;
