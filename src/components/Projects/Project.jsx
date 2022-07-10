import React from "react";
import "./Project.css";
import imgUrl from "../../img/main.png";
import Form from "../Form";

const Project = ({
  name,
  description,
  totalFund,
  onSubmit,
  currentUser,
  id,
}) => (
  <div className="gpt3__project-container_project">
    <div className="gpt3__project-container_project-image">
      <img src={imgUrl} alt="project_image" />
    </div>
    <div className="gpt3__project-container_project-content">
      <div>
        <p>
          {" "}
          <b>Service Name :</b> {name}
        </p>
        <p> Servic description : {description}</p>
        <p> Received Donation : {totalFund / 1000000000000000000000000} NEAR</p>
      </div>
      <Form onSubmit={onSubmit} currentUser={currentUser} projectId={id} />
    </div>
  </div>
);

export default Project;
