import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import { getProjectTasks, updateProjectTasks } from "../firebase/firebaseHelper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const projectTasks = await getProjectTasks(projectId);
      setTasks(projectTasks);
    };
    fetchTasks();
  }, [projectId]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = tasks[source.droppableId];
    const destinationList = tasks[destination.droppableId];
    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);

    const updatedTasks = { ...tasks, [source.droppableId]: sourceList, [destination.droppableId]: destinationList };
    setTasks(updatedTasks);
    await updateProjectTasks(projectId, updatedTasks);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project Tasks
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.keys(tasks).map((column) => (
            <Grid item xs={4} key={column}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{column.toUpperCase()}</Typography>
                <Droppable droppableId={column}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {tasks[column].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ margin: "8px 0", padding: 2 }}
                            >
                              {task.title}
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
