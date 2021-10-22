import "../../Style/imgUpload.css";
import "../../Style/student.css";
import React, { useState, useEffect } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { database, Storage } from "../../Config/firebaseConfig";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import fallBackImage from "../../Images/images.png";
import { Button } from "@material-ui/core";
import { updateFormValidationStudent } from "../../Validation/validation";
import { updateFormValidationCompany } from "../../Validation/validation";

function ProfileUpdate(props) {
  console.log("props====>", props);
  const user = useSelector((state) => state.addUser);
  const [url, setUrl] = useState("");
  const [disabled, setDisabled] = useState(false);
  const role = user.loginUser.role;
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: user.loginUser.email,
      name: user.loginUser.name ? user.loginUser.name : "",
      phone: user.loginUser.phone ? user.loginUser.phone : "",
      dob: user.loginUser.dob ? user.loginUser.dob : "",
      cgpa: user.loginUser.cgpa ? user.loginUser.cgpa : "",
      education: user.loginUser.education ? user.loginUser.education : "",
      skills: user.loginUser.skills ? user.loginUser.skills : "",
      experienceYears: user.loginUser.experienceYears ? user.loginUser.experienceYears : "",
      experienceMonths: user.loginUser.experienceMonths ? user.loginUser.experienceMonths : "",
      website: user.loginUser.website ? user.loginUser.website : "",
      city: user.loginUser.city ? user.loginUser.city : "",
      bio: user.loginUser.bio ? user.loginUser.bio : "",
    },
    validationSchema:
      role === "student"
        ? updateFormValidationStudent
        : role === "company"
          ? updateFormValidationCompany
          : null,

    onSubmit: (values) => {
      const { dob, education, cgpa, skills, name, experience, phone, website, city, bio, experienceMonths, experienceYears } =
        values;
      console.log("submit")
      setDisabled(true)

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
              experienceMonths: experienceMonths,
              experienceYears: experienceYears,
              fileToUpload: url,
              city: city,
              bio: bio,
            }
            : role === "company"
              ? {
                name: name,
                phone: phone,
                fileToUpload: url,
                website: website,
                city: city,

              }
              : null
        )
        .then((res) => {
          console.log(res);
          setDisabled(false)
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
    Storage.ref("images/" + images?.name + uniqueName)
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

  useEffect(() => {
    setUrl(props.campusData?.fileToUpload);
    // console.log("props", props.campusData.fileToUpload)
  }, []);
  return (
    <div className="main_div">
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
        )
        }
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
        {/* add location */}
        {props.jobPost ? null : (
          <>
            <TextField
              // pattern=".*\S+.*"
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
          </>
        )}
        {/* add bio */}
        {role === "student" ? (
          <>
            <TextField
              type="text"
              label="Bio"
              placeholder="Bio"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange("bio")}
            />
            {formik.errors.bio && formik.touched.bio && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.bio}
              </p>
            )}
          </>
        ) : null}
        {role === "student" ? (
          <>
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
          </>)
          : null}
        {role === "student" ? (
          <div style={{ display: "flex" }}>
            <TextField
              select
              id="select"
              label="Experience Years"
              placeholder="Experience Years"
              // width={1}
              fullWidth
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
            <TextField
              select
              id="select"
              label="Experience Months"
              placeholder="Experience Months"
              // width={1}
              fullWidth
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
          </div>
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
        ) : null
        }
        {console.log("URL is ", url)}
        {
          props.jobPost ? null : (
            <div className="updateImgDiv">
              <label for="fileToUpload">
                <div
                  className="profile-pic"
                  id="profilePic"
                  style={{
                    backgroundImage: `url( ${url ? url : fallBackImage} )`,
                  }}
                >
                  {/* <img src={url ? url : fallBackImage} /> */}
                  <span class="glyphicon glyphicon-camera"></span>
                  <span>Change Image</span>
                </div>
              </label>
              <input
                value={formik.values.fileToUpload}
                type="File"
                name="fileToUpload"
                id="fileToUpload"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={uploadImg}
              />
            </div>
          )
        }
        < Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Update
        </Button>
      </form >
    </div >
  );
}

export default ProfileUpdate;