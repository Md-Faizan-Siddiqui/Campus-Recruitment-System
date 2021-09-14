import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import { database } from "../Config/firebaseConfig";
import { Button } from "@material-ui/core";

function JobPostForm(props) {
  // console.log("props====>", props);
  const user = useSelector((state) => state.addUser);
  const formik = useFormik({
    initialValues: {
      email: user.loginUser.email,
      name: user.loginUser.name ? user.loginUser.name : "",
      phone: user.loginUser.phone ? user.loginUser.phone : "",
      education: user.loginUser.education ? user.loginUser.education : "",
      experience: user.loginUser.experience ? user.loginUser.experience : "",
      website: user.loginUser.website ? user.loginUser.website : "",
      jobTitle: user.loginUser.jobTitle ? user.loginUser.jobTitle : "",
      jobType: user.loginUser.jobType ? user.loginUser.jobType : "",
      lastDate: user.loginUser.lastDate ? user.loginUser.lastDate : "",
      salary: user.loginUser.salary ? user.loginUser.salary : "",
      jobDescription: user.loginUser.jobDescription
        ? user.loginUser.jobDescription
        : "",
    },

    onSubmit: (values) => {
      const {
        name,
        phone,
        email,
        jobTitle,
        jobDescription,
        website,
        jobType,
        lastDate,
        experience,
        education,
        salary,
      } = values;
      // console.log("Values====>", values);
      const key = Date.now();
      database
        .ref(`/CRA/jobs/${user.loginUser.id}/${key}`)
        .set({
          jobId: key,
          name: name,
          phone: phone,
          email: email,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          website: website,
          jobType: jobType,
          lastDate: lastDate,
          experience: experience,
          education: education,
          salary: salary,
        })
        .then((res) => {
          props.handleClose();
        })
        .catch((err) => {
          console.log("Error=====>", err);
        });
    },
  });
  return (
    <div className="main_div">
      <div className="form_div">
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              label="Name"
              placeholder="Name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              autoFocus
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
            />
            {formik.errors.name && formik.touched.name && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.name}
              </p>
            )}
            <TextField
              label="Phone"
              placeholder="Phone"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange("phone")}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.phone}
              </p>
            )}
            <TextField
              label="Job Title"
              placeholder="Job Title"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange("jobTitle")}
            />
            <TextField
              label="Job Description"
              placeholder="Job Description"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="jobDescription"
              value={formik.values.jobDescription}
              onChange={formik.handleChange("jobDescription")}
            />
            <TextField
              label="Email"
              placeholder="Email"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
            />
            <TextField
              label="Website"
              placeholder="Website"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange("website")}
            />
            <TextField
              label="Job Type"
              placeholder="Job Type"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="jobType"
              value={formik.values.jobType}
              onChange={formik.handleChange("jobType")}
            />
            <TextField
              type="date"
              label="Last Date"
              placeholder="Last Date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="lastDate"
              value={formik.values.lastDate}
              onChange={formik.handleChange("lastDate")}
            />
            <TextField
              type="number"
              label="Salary"
              placeholder="Salary"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange("salary")}
            />
            <TextField
              label="Experience"
              placeholder="Experience"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange("experience")}
            />
            <TextField
              type="text"
              label="Education"
              placeholder="Education"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="education"
              value={formik.values.education}
              onChange={formik.handleChange("education")}
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobPostForm;
