import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";

const Taskboard = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, name: "Design UI mockups" },
      { id: 2, name: "Write project proposal" },
    ],
    inProgress: [
      { id: 3, name: "Develop React components" },
    ],
    completed: [
      { id: 4, name: "Set up GitHub repository" },
    ],
  });
  const [newTaskName, setNewTaskName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const moveTask = (task, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[task.status] = updatedTasks[task.status].filter(
        (t) => t.id !== task.id
      );
      task.status = newStatus;
      updatedTasks[newStatus].push(task);
      return updatedTasks;
    });
  };

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = {
      id: Date.now(), // Use timestamp as a unique ID
      name: newTaskName,
      status: "todo", // New tasks start in "To Do"
    };
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks.todo.push(newTask);
      return updatedTasks;
    });
    setNewTaskName("");
    setSnackbarMessage("Task added successfully!");
    setOpenSnackbar(true);
  };

  const removeTask = (task, status) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[status] = updatedTasks[status].filter((t) => t.id !== task.id);
      return updatedTasks;
    });
    setSnackbarMessage("Task removed successfully!");
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
      <Container>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, mb: 4 }}>
          Taskboard
        </Typography>

        {/* Task creation */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <TextField
            label="New Task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <IconButton color="primary" onClick={addTask}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Task Status Columns */}
        <Grid container spacing={4}>
          {["todo", "inProgress", "completed"].map((status, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {status === "todo"
                    ? "To Do"
                    : status === "inProgress"
                    ? "In Progress"
                    : "Completed"}
                </Typography>
                <Box sx={{ minHeight: 200 }}>
                  {tasks[status].map((task) => (
                    <Box
                      key={task.id}
                      sx={{
                        backgroundColor: "#e0e0e0",
                        p: 2,
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <Typography variant="body2">{task.name}</Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {status === "todo" && (
                          <Button
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() => moveTask(task, "inProgress")}
                          >
                            Start Task
                          </Button>
                        )}
                        {status === "inProgress" && (
                          <Button
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() => moveTask(task, "completed")}
                          >
                            Mark as Complete
                          </Button>
                        )}
                        <Button
                          size="small"
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={() => removeTask(task, status)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Taskboard;
