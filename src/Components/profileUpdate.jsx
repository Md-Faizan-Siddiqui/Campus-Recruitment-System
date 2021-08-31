import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "../Style/student.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { auth, database, Storage } from "../Config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Student/imgUpload.css";
import fallImage from "./Student/img/images.png";

function ProfileUpdate(props) {
  console.log("props====>", props);
  const user = useSelector((state) => state.addUser);
  const [url, setUrl] = useState("");
  const role = user.loginUser.role;
  const history = useHistory();

  console.log("user===>", user);
  console.log("role====>", role);
  console.log("url====>", url);
  console.log("Login User ID===>", user.loginUser.id);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      name: user.loginUser.name ? user.loginUser.name : "",
      phone: user.loginUser.phone ? user.loginUser.phone : "",
      dob: user.loginUser.dob ? user.loginUser.dob : "",
      cgpa: user.loginUser.cgpa ? user.loginUser.cgpa : "",
      education: user.loginUser.education ? user.loginUser.education : "",
      skills: user.loginUser.skills ? user.loginUser.skills : "",
      experience: user.loginUser.experience ? user.loginUser.experience : "",
    },
    // validationSchema: Yup.object({
    //   name: Yup.string()
    //     .max(30, "Must be 30 characters or less")
    //     .required("Required"),
    //   email: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is Required"),
    //   //   role: Yup.mixed()
    //   //     .required("Selection is Required")
    //   //     .oneOf(["company", "student"]),
    //   dob: Yup.string().required("Required"),
    //   phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    //   cgpa: Yup.string().required("Invalid CGPA"),
    //   education: Yup.string().required("Required"),
    //   skills: Yup.string().required("Required"),
    //   experience: Yup.string().required("Required"),
    // }),

    onSubmit: (values) => {
      const { dob, education, cgpa, skills, name, experience, phone } = values;
      console.log("Values====>", values);

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
              }
            : null
        )
        .then((res) => {
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
  console.log("user======>", user.loginUser.fileToUpload);

  useEffect(() => {
    setUrl(props.cardData.fileToUpload);
  }, []);

  return (
    <div className="main_div">
      <div className="form_div">
        <div>
          <h1>Edit Your Profile</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
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
            {role === "student" ? (
              <TextField
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
            ) : null}
            {role === "student" ? (
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
              />
            ) : null}
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
            {role === "student" ? (
              <TextField
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
            ) : null}
            {role === "student" ? (
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
            <div className="updateImgDiv">
              <label for="fileToUpload">
                <div
                  className="profile-pic"
                  id="profilePic"
                  style={{
                    backgroundImage: `url( ${url ? url : fallImage} )`,
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
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
