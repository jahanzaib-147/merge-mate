import React, { useState } from "react";
import { TextField, Button, Drawer, Box, Typography } from "@mui/material";
import { addProject } from "../../firebase/firebaseHelper";

const AddProject = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const handleAddProject = async (e) => {
    e.preventDefault();
    const newProject = {
      title,
      description,
      techStack: techStack.split(",").map((tech) => tech.trim()),
    };
    await addProject(newProject);
    setTitle("");
    setDescription("");
    setTechStack("");
    alert("Project added successfully!");
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Typography variant="h6" mb={2}>
          Add New Project
        </Typography>
        <form onSubmit={handleAddProject}>
          <TextField
            label="Project Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Project Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Tech Stack (comma-separated)"
            fullWidth
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Project
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddProject;
