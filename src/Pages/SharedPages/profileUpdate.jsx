import "../../Style/imgUpload.css";
import "../../Style/student.css";
import React, { useState, useEffect } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { database, Storage } from "../../Config/firebaseConfig";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import fallBackImage from "../../Images/images.png";
// import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { updateFormValidationStudent } from "../../Validation/validation";
import { updateFormValidationCompany } from "../../Validation/validation";

function ProfileUpdate(props) {
  console.log("props====>", props);
  const user = useSelector((state) => state.addUser);
  const [url, setUrl] = useState("");
  const role = user.loginUser.role;
  const history = useHistory();

  // console.log("user===>", user);
  // console.log("role====>", role);
  // console.log("url====>", url);
  // console.log("Login User ID===>", user.loginUser.id);

  // const phoneRegExp =
  //   /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  const formik = useFormik({
    initialValues: {
      email: user.loginUser.email,
      name: user.loginUser.name ? user.loginUser.name : "",
      phone: user.loginUser.phone ? user.loginUser.phone : "",
      dob: user.loginUser.dob ? user.loginUser.dob : "",
      cgpa: user.loginUser.cgpa ? user.loginUser.cgpa : "",
      education: user.loginUser.education ? user.loginUser.education : "",
      skills: user.loginUser.skills ? user.loginUser.skills : "",
      experience: user.loginUser.experience ? user.loginUser.experience : "",
      website: user.loginUser.website ? user.loginUser.website : "",
    },
    validationSchema:
      role === "Student"
        ? updateFormValidationStudent
        : role === "company"
        ? updateFormValidationCompany
        : null,
    // validationSchema: Yup.object({
    //   // name 1
    //   name: Yup.string()
    //     .max(30, "Must be 30 characters or less")
    //     .required("Required Name"),
    //   // cgpa 2
    //   cgpa: Yup.number()
    //     .min(0.1, "Invalid CGPA")
    //     .max(4.0, "Invalid CGPA")
    //     .required("Required CGPA"),
    //   //education 3
    //   education: Yup.mixed()
    //     .oneOf(["Matric", "Inter", "Graduate", "Master's"])
    //     .required("Required Education"),
    //   //phone 4
    //   phone: Yup.string()
    //     .matches(phoneRegExp, "Invalid Phone Number")
    //     .required("Required Phone Number"),
    //   // dob 5
    //   dob: Yup.date()
    //     .max(
    //       new Date(Date.now() - 568111068000), // Task completed after 2.5 hours
    //       "You must be at least 18 years"
    //     )
    //     .required("Required"),
    //   // skills 6
    //   skills: Yup.string().required("Required"),
    //   // experience 7
    //   experience: Yup.string().required("Required"),
    //   // email: Yup.string()
    //   //   .email("Invalid email address")
    //   //   .required("Email is Required"),
    //   //   role: Yup.mixed()
    //   //     .required("Selection is Required")
    //   //     .oneOf(["company", "student"]),
    // }),

    onSubmit: (values) => {
      const { dob, education, cgpa, skills, name, experience, phone, website } =
        values;
      // console.log("Values====>", values);
      // alert("Running");

      database
        .ref("/CRA")
        .child("users/" + user.loginUser.id)
        .update(
          role === "student"
            ? {
                dob: dob,
                education: education,
                cgpa: cgpa,
                skills: skills,
                name: name,
                phone: phone,
                experience: experience,
                fileToUpload: url,
              }
            : role === "company"
            ? {
                name: name,
                phone: phone,
                fileToUpload: url,
                website: website,
              }
            : null
        )
        .then((res) => {
          console.log(res);
          props.handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const uploadImg = (e) => {
    console.log(e.target.files[0]);
    let images = e.target.files[0];
    const uniqueName = Date.now();
    Storage.ref("images/" + images.name + uniqueName)
      .put(images)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((URL) => {
          setUrl(URL);
          console.log(URL);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("user======>", user.loginUser.fileToUpload);

  useEffect(() => {
    setUrl(props.cardData?.fileToUpload);
  }, []);

  return (
    <div className="main_div">
      {/* <div className="form_div"> */}
      <form onSubmit={formik.handleSubmit}>
        {props.jobPost ? null : (
          <>
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
          </>
        )}
        {role === "student" ? (
          <>
            <TextField
              type="number"
              label="CGPA"
              placeholder="CGPA"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="cgpa"
              value={formik.values.cgpa}
              onChange={formik.handleChange("cgpa")}
            />
            {formik.errors.cgpa && formik.touched.cgpa && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.cgpa}
              </p>
            )}
          </>
        ) : null}
        {role === "student" ? (
          <>
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
          </>
        ) : null}
        {props.jobPost ? null : (
          <>
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
          </>
        )}
        {role === "student" ? (
          <>
            <TextField
              type="date"
              label="Date Of Birth"
              placeholder="D.O.B"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange("dob")}
            />
            {formik.errors.dob && formik.touched.dob && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.dob}
              </p>
            )}
          </>
        ) : null}
        {role === "student" ? (
          <>
            <TextField
              label="Skills"
              placeholder="Skills"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="skills"
              value={formik.values.skills}
              onChange={formik.handleChange("skills")}
            />
            {formik.errors.skills && formik.touched.skills && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.skills}
              </p>
            )}
          </>
        ) : null}
        {role === "student" ? (
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
        ) : null}
        {role === "company" ? (
          <>
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
          </>
        ) : null}
        {props.jobPost ? null : (
          <div className="updateImgDiv">
            <label for="fileToUpload">
              <div
                className="profile-pic"
                id="profilePic"
                style={{
                  backgroundImage: `url( ${url ? url : fallBackImage} )`,
                }}
              >
                <span class="glyphicon glyphicon-camera"></span>
                <span>Change Image</span>
              </div>
            </label>
            <input
              value={formik.values.fileToUpload}
              type="File"
              name="fileToUpload"
              id="fileToUpload"
              onChange={uploadImg}
            />
          </div>
        )}
        {/* <button type="submit">Update</button> */}
        <Button type="submit" size="small" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
    // </div>
  );
}

export default ProfileUpdate;
