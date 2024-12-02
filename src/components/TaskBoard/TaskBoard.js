import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const TaskBoard = ({ tasks, onTaskUpdate }) => {
  const [columns, setColumns] = useState({
    todo: tasks.filter(task => task.status === "To Do"),
    inProgress: tasks.filter(task => task.status === "In Progress"),
    completed: tasks.filter(task => task.status === "Completed"),
  });

  const moveTask = (task, status) => {
    task.status = status;
    onTaskUpdate(task)
    setColumns({
      todo: status === "To Do" ? [...columns.todo, task] : columns.todo.filter((t) => t.id !== task.id),
      inProgress: status === "In Progress" ? [...columns.inProgress, task] : columns.inProgress.filter((t) => t.id !== task.id),
      completed: status === "Completed" ? [...columns.completed, task] : columns.completed.filter((t) => t.id !== task.id),
    })
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ width: "30%" }}>
        <Typography variant="h5">To Do</Typography>
        {columns.todo.map((task) => (
          <Button
            key={task.id}
            onClick={() => moveTask(task, "In Progress")}
            sx={{ marginBottom: 1, display: "block", width: "100%" }}
          >
            {task.title}
          </Button>
        ))}
      </Box>

      <Box sx={{ width: "30%" }}>
        <Typography variant="h5">In Progress</Typography>
        {columns.inProgress.map((task) => (
          <Button
            key={task.id}
            onClick={() => moveTask(task, "Completed")}
            sx={{ marginBottom: 1, display: "block", width: "100%" }}
          >
            {task.title}
          </Button>
        ))}
      </Box>

      <Box sx={{ width: "30%" }}>
        <Typography variant="h5">Completed</Typography>
        {columns.completed.map((task) => (
          <Button
            key={task.id}
            onClick={() => moveTask(task, "To Do")}
            sx={{ marginBottom: 1, display: "block", width: "100%" }}
          >
            {task.title}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default TaskBoard;
