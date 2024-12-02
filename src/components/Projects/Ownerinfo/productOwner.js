import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Select, MenuItem } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProjectOwner = () => {
  const [repository, setRepository] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    techStack: "",
  });
  const [repositories, setRepositories] = useState([]);
  const [tasks, setTasks] = useState({
    todo: [{ id: "1", title: "Initial Task" }],
    inProgress: [],
    completed: [],
  });
  const [requests, setRequests] = useState([
    { id: 1, contributor: "Alice", project: "React Project" },
    { id: 2, contributor: "Bob", project: "Node.js Project" },
  ]);
  const [notifications, setNotifications] = useState([]);
  const [contributors, setContributors] = useState([
    { id: 1, name: "Alice", expertise: "React" },
    { id: 2, name: "Bob", expertise: "Node.js" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Add Repository Functionality
  const handleAddRepository = (e) => {
    e.preventDefault();
    setRepositories([...repositories, repository]);
    setRepository({ title: "", description: "", difficulty: "Beginner", techStack: "" });
    setNotifications([...notifications, "New repository added!"]);
  };

  // Drag-and-Drop Functionality for Task Board
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceList = [...tasks[source.droppableId]];
    const destinationList = [...tasks[destination.droppableId]];
    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);
    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
    setNotifications([...notifications, `Task "${movedTask.title}" updated!`]);
  };

  // Manage Contribution Requests
  const handleRequestAction = (id, action) => {
    setRequests(requests.filter((request) => request.id !== id));
    setNotifications([...notifications, `Request ${id} was ${action}.`]);
  };

  // Contributor Search Functionality
  const filteredContributors = contributors.filter((contributor) =>
    contributor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Project Owner Dashboard
      </Typography>

      {/* Add Repository Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Add Repository</Typography>
        <form onSubmit={handleAddRepository}>
          <TextField
            label="Title"
            value={repository.title}
            onChange={(e) => setRepository({ ...repository, title: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={repository.description}
            onChange={(e) => setRepository({ ...repository, description: e.target.value })}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Select
            value={repository.difficulty}
            onChange={(e) => setRepository({ ...repository, difficulty: e.target.value })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
          <TextField
            label="Tech Stack (comma-separated)"
            value={repository.techStack}
            onChange={(e) => setRepository({ ...repository, techStack: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Repository
          </Button>
        </form>
      </Box>

      {/* Contribution Requests Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Contribution Requests</Typography>
        {requests.map((request) => (
          <Paper key={request.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography>
              {request.contributor} wants to contribute to {request.project}.
            </Typography>
            <Button
              onClick={() => handleRequestAction(request.id, "accepted")}
              variant="contained"
              color="success"
              sx={{ marginRight: 1 }}
            >
              Accept
            </Button>
            <Button
              onClick={() => handleRequestAction(request.id, "rejected")}
              variant="contained"
              color="error"
            >
              Reject
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Task Board Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Task Board</Typography>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            {["todo", "inProgress", "completed"].map((columnId) => (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "30%",
                      minHeight: "300px",
                      backgroundColor: "#f4f4f4",
                      padding: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="h6">{columnId.toUpperCase()}</Typography>
                    {tasks[columnId].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ padding: 2, marginBottom: 2 }}
                          >
                            {task.title}
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            ))}
          </Box>
        </DragDropContext>
      </Box>

      {/* Contributor Search Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Search Contributors</Typography>
        <TextField
          label="Search by Name"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          margin="normal"
        />
        {filteredContributors.map((contributor) => (
          <Paper key={contributor.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography>
              {contributor.name} - Expertise: {contributor.expertise}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Notifications Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5">Notifications</Typography>
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ProjectOwner;
