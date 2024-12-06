import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Drawer,
  Box,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { addProject, getAllProjects, uploadFile } from "../../firebase/firebaseHelper";

const AddProject = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getAllProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        triggerAlert("error", "Failed to fetch projects. Please check your connection.");
      }
    };

    fetchProjects();
  }, []);

  const triggerAlert = (type, message) => {
    setAlert({ type, message });
    setSnackbarOpen(true);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!title || !description || !techStack || !difficulty) {
      triggerAlert("warning", "Please fill out all required fields.");
      return;
    }

    try {
      const fileUploadPromises = files.map((file) => uploadFile(file));
      const fileURLs = await Promise.all(fileUploadPromises);

      const newProject = {
        title,
        description,
        techStack: techStack.split(",").map((tech) => tech.trim()),
        difficulty,
        guidelines,
        files: fileURLs,
      };

      await addProject(newProject);

      // Reset form
      setTitle("");
      setDescription("");
      setTechStack("");
      setDifficulty("");
      setGuidelines("");
      setFiles([]);

      triggerAlert("success", "Project added successfully!");

      // Refresh projects
      const updatedProjects = await getAllProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error adding project:", error);
      triggerAlert("error", `Failed to add project. Reason: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h5" mb={3} fontWeight="bold">
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
            required
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
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              p: 2,
              textAlign: "center",
              mt: 2,
              cursor: "pointer",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <Typography variant="body2" color="textSecondary">
              Drag and drop files here or click to upload
            </Typography>
          </Box>
          <input
            id="file-input"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Files: {files.map((file, index) => file.name).join(", ")}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Project
          </Button>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default AddProject;
