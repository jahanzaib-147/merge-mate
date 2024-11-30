import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ProjectCard = ({ project, onLike }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5">{project.name}</Typography>
        <Typography variant="body2">{project.description}</Typography>
        <Button variant="contained" color="primary" onClick={() => onLike(project.id)}>
          Like
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
