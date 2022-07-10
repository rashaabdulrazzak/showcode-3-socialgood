import React from "react";
import Feature from "./Feature";
import "./Main.css";

const featuresData = [
  {
    title: "Training",
    text: "We are offering 3-6 months training programs for graduated girls to upskill their qualification with the new requirements for the job market.",
  },
  {
    title: "Mentoring",
    text: "Our Mentor programs developed to support women in the STEM industry at all levels. From beginners who wants to find their path in tech to professonal women who want to enhance their career.",
  },
  {
    title: "Workshops",
    text: "We are providing online and physiacl workshops to enhance softskills ",
  },
  {
    title: "Networking & events",
    text: "We are connecting with companies all over the world to get a good opportunitis for our members",
  },
  {
    title: "Scolarships",
    text: "We are offering scolarships to study and learn about specific paths in tech",
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">What We Are Doing?</h1>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
