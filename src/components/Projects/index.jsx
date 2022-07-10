import React from "react";
import Project from "./Project";

import "./Project.css";

const Projects = ({ projects, onSubmit, currentUser }) => (
  <div className="gpt3__project section__padding" id="project">
    <div className="gpt3__project-heading">
      <h1 className="gradient__text">
        The Future is Starting From Today <br /> and We Just Need to Your Help
        Forming It. & Make it Happen.
      </h1>
    </div>
    <div className="gpt3__project-container">
      <div className="gpt3__project-container_groupB">
        {projects.map((project) => (
          <Project
            key={project.id}
            {...project}
            onSubmit={onSubmit}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Projects;
