import React from "react";
import mainImg from "../../img/main.png";
import "./Main.css";

const Main = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Let&apos;s Change the Statics Together</h1>
      <p>
        Let&apos;s Fix the “leaks” in the career pipeline by encouraging more
        girls to study engineering and providing them with need skills in the
        field
      </p>
    </div>
    <div className="gpt3__header-image">
      <img src={mainImg} />
    </div>
  </div>
);

export default Main;
