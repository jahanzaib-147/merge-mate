import React, { useState } from "react";
import { TextField, Button, Drawer, Box, Typography, MenuItem } from "@mui/material";
import { addProject } from "../../firebase/firebaseHelper";

const AddProject = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [guidelines, setGuidelines] = useState("");

  const handleAddProject = async (e) => {
    e.preventDefault();
    const newProject = {
      title,
      description,
      techStack: techStack.split(",").map((tech) => tech.trim()),
      difficulty,
      guidelines,
    };
    try {
      await addProject(newProject);
      setTitle("");
      setDescription("");
      setTechStack("");
      setDifficulty("");
      setGuidelines("");
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
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
          <TextField
            label="Difficulty"
            fullWidth
            select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            margin="normal"
            required
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </TextField>
          <TextField
            label="Contribution Guidelines"
            fullWidth
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            margin="normal"
            multiline
            rows={3}
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
