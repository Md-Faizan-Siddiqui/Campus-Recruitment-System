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
  input: {
    width: "100%"
  },
  inputSpan: {
    width: "100%"
  },
  margin: {
    marginRight: "10px"
  }
}))

function JobPostForm(props) {
  const user = useSelector((state) => state.addUser);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      education: user.loginUser.education ? user.loginUser.education : "",
      experienceYears: user.loginUser.experienceYears ? user.loginUser.experienceYears : "",
      experienceMonths: user.loginUser.experienceMonths ? user.loginUser.experienceMonths : "",
      jobTitle: user.loginUser.jobTitle ? user.loginUser.jobTitle : "",
      jobType: user.loginUser.jobType ? user.loginUser.jobType : "",
      lastDate: user.loginUser.lastDate ? user.loginUser.lastDate : "",
      salary: user.loginUser.salary ? user.loginUser.salary : "",
      jobDescription: user.loginUser.jobDescription
        ? user.loginUser.jobDescription
        : "",
    },

    validationSchema: JobPostFormValidation,

    onSubmit: (values) => {
      const {
        jobTitle,
        jobDescription,
        jobType,
        lastDate,
        experienceMonths, 
        experienceYears,
        education,
        salary,
      } = values;
      const key = Date.now();
      database
        .ref(`/CRA/jobs/${user.loginUser.id}/${key}`)
        .set({
          jobId: key,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          jobType: jobType,
          lastDate: lastDate,
          experienceMonths: experienceMonths,
          experienceYears: experienceYears,
          education: education,
          salary: salary,
          block: false,
          userId: user.loginUser.id,
        })
        .then((res) => {
          props.handleClose();
        })
        .catch((err) => {
          console.log(err)
        });
    },
  });
  return (
    <div >
      <div className="form_div">
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={`${classes.inputSpan} ${classes.margin}`}>
                <TextField
                  classes={{ root: classes.input }}
                  select
                  id="select"
                  label="Experience Years"
                  placeholder="Experience Years"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  name="experience Years"
                  value={formik.values.experienceYears}
                  onChange={formik.handleChange("experienceYears")}
                >
                  <MenuItem value="Fresh">Fresh</MenuItem>
                  <MenuItem value="1 Year">1 Year</MenuItem>
                  <MenuItem value="2 Years">2 Years</MenuItem>
                  <MenuItem value="3 Years">3 Years</MenuItem>
                  <MenuItem value="4 Years">4 Years</MenuItem>
                  <MenuItem value="5 Years">5 Years</MenuItem>
                  <MenuItem value="6 Years">6 Years</MenuItem>
                  <MenuItem value="7 Years">7 Years</MenuItem>
                  <MenuItem value="8 Years">8 Years</MenuItem>
                  <MenuItem value="9 Years">9 Years</MenuItem>
                  <MenuItem value="10 Years">10 Years</MenuItem>
                </TextField>
                {formik.errors.experienceYears && formik.touched.experienceYears && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.experienceYears}
                  </p>
                )}
              </span>
              <span className={classes.inputSpan}>
                <TextField
                  classes={{ root: classes.input }}
                  select
                  id="select"
                  label="Experience Months"
                  placeholder="Experience Months"
                  disabled={formik.values.experienceYears === "Fresh" ? true : false}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  name="experienceMonths"
                  value={formik.values.experienceMonths}
                  onChange={formik.handleChange("experienceMonths")}
                >
                  <MenuItem value="">Select One</MenuItem>
                  <MenuItem value="1 Month">1 Month</MenuItem>
                  <MenuItem value="2 Months">2 Months</MenuItem>
                  <MenuItem value="3 Months">3 Months</MenuItem>
                  <MenuItem value="4 Months">4 Months</MenuItem>
                  <MenuItem value="5 Months">5 Months</MenuItem>
                  <MenuItem value="6 Months">6 Months</MenuItem>
                  <MenuItem value="7 Months">7 Months</MenuItem>
                  <MenuItem value="8 Months">8 Months</MenuItem>
                  <MenuItem value="9 Months">9 Months</MenuItem>
                  <MenuItem value="10 Months">10 Months</MenuItem>
                  <MenuItem value="11 Months">11 Months</MenuItem>
                </TextField>
                {formik.errors.experienceMonths && formik.touched.experienceMonths && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.experienceMonths}
                  </p>
                )}
              </span>
            </div>
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
