import React from "react";
import errorImage from "../Images/404error.jpg";

function PageNotFound() {
  return (
    <div>
      <img src={errorImage} alt="404 error" />
    </div>
  );
}

export default PageNotFound;
