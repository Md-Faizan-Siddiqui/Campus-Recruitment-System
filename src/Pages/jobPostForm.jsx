import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { MenuItem, TextField } from "@material-ui/core";
import { database } from "../Config/firebaseConfig";
import { Button } from "@material-ui/core";
import { JobPostFormValidation } from "../Validation/validation"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
      margin: "10px 5px 0px 5px",
      fontSize: "12px",
      fontWeight: "bold",
      borderColor: "#3c52b2",
      border: "2px solid",
      backgroundColor: '#fff',
      color: '#3c52b2',
      '&:hover': {
          borderColor: "#3c52b2",
          border: "2px solid",
          backgroundColor: '#3c52b2',
          color: '#fff',
      },
  },
}))

function JobPostForm(props) {
  const user = useSelector((state) => state.addUser);
  console.log("Job post", user.loginUser.fileToUpload)
  const classes = useStyles();
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
      city: user.loginUser.city ? user.loginUser.city : "",
      jobDescription: user.loginUser.jobDescription
        ? user.loginUser.jobDescription
        : "",
    },

    validationSchema: JobPostFormValidation,

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
        city,
      } = values;
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
          block: false,
          city:city,
          userId: user.loginUser.id,
          fileToUpload:user.loginUser.fileToUpload,
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
              type="text"
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
            {formik.errors.jobTitle && formik.touched.jobTitle && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.jobTitle}
              </p>
            )}
            <TextField
              type="text"
              label="Job Description"
              placeholder="Job Description"
              fullWidth
              margin="normal"
              multiline
              rowsMax={4}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="jobDescription"
              value={formik.values.jobDescription}
              onChange={formik.handleChange("jobDescription")}
            />
            {formik.errors.jobDescription && formik.touched.jobDescription && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.jobDescription}
              </p>
            )}
            <TextField
              type="email"
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
            {formik.errors.email && formik.touched.email && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.email}
              </p>
            )}
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
            {formik.errors.website && formik.touched.website && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.website}
              </p>
            )}
            <TextField
              type="text"
              label="City"
              placeholder="City"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange("city")}
            />
            {formik.errors.city && formik.touched.city && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.city}
              </p>
            )}
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
              id="select"
              select
            >
              <MenuItem value="">Select One</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
            </TextField>
            {formik.errors.jobType && formik.touched.jobType && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.jobType}
              </p>
            )}
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
            {formik.errors.lastDate && formik.touched.lastDate && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.lastDate}
              </p>
            )}
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
            {formik.errors.salary && formik.touched.salary && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.salary}
              </p>
            )}
            <TextField
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
              id="select"
              select
            >
              <MenuItem value="">Select One</MenuItem>
              <MenuItem value="Matric">Matric</MenuItem>
              <MenuItem value="Inter">Inter</MenuItem>
              <MenuItem value="Graduate">Graduate</MenuItem>
              <MenuItem value="Master's">Master's</MenuItem>
            </TextField>
            {formik.errors.education && formik.touched.education && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.education}
              </p>
            )}
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
            {formik.errors.experience && formik.touched.experience && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.experience}
              </p>
            )}
            <Button
            className={classes.button}
              type="submit"
              size="small"
              variant="outlined"
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
