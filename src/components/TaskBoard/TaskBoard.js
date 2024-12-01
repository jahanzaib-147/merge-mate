import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = ({ tasks, onTaskUpdate }) => {
  const [columns, setColumns] = useState({
    todo: tasks.filter((task) => task.status === "To Do"),
    inProgress: tasks.filter((task) => task.status === "In Progress"),
    completed: tasks.filter((task) => task.status === "Completed"),
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Task wasn't dropped in a valid column.

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return; // No change in position.
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    movedTask.status = destination.droppableId; // Update task status.
    destinationColumn.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    });

    onTaskUpdate(movedTask); // Notify parent of the update.
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {["todo", "inProgress", "completed"].map((columnId) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <Box
                sx={{ width: "30%", minHeight: "300px", backgroundColor: "#f4f4f4", padding: 2 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Typography variant="h5" gutterBottom>
                  {columnId === "todo"
                    ? "To Do"
                    : columnId === "inProgress"
                    ? "In Progress"
                    : "Completed"}
                </Typography>
                {columns[columnId].map((task, index) => (
                  <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                    {(provided) => (
                      <Paper
                        sx={{ padding: 2, marginBottom: 2, backgroundColor: "#fff" }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
  );
};

export default TaskBoard;
