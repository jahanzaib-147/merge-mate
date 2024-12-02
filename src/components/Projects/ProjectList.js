import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }) => {
  return (
    <div>
      <ProjectCard projects={projects} />
    </div>
  );
};

export default ProjectList;
