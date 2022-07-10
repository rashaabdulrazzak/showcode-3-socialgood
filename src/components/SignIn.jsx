import React from "react";
import cover from "../img/main.png";
export default function SignIn() {
  return (
    <>
      <img src={cover} alt="cover" style={{ height: "300px" }} />
      <div style={{ padding: "30px" }}>
        <p>
          We are trying to encourage and help more women to get in technology
        </p>
        <p>We are providing many service to empower them</p>
        <p>Go ahead and sign in to try it out!</p>
      </div>
    </>
  );
}
