import React from "react";
import OutlinedCard from "../card";
import CustomizedDialogs from "../modal";

function JobPost() {
  return (
    <div>
      <h1>Job Post</h1>
      <CustomizedDialogs formTitle="Create Job" btnText="Create Job" jobPost />
      {/* <OutlinedCard /> */}
    </div>
  );
}

export default JobPost;
