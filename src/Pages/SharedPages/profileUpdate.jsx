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
import GroupedSelect from "../../Components/multySelect";

function ProfileUpdate(props) {
  console.log("props====>", props);
  const user = useSelector((state) => state.addUser);
  const [url, setUrl] = useState("");
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
      experience: user.loginUser.experience ? user.loginUser.experience : "",
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
      const { dob, education, cgpa, skills, name, experience, phone, website, city, bio } =
        values;

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
              city: city,
              bio: bio,
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
        {
          props.jobPost ? null : (
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
        {role === "student" ? (
          <>
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
          </>
        ) : null}
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
        {/* {role === "student" ? (
          <>
            <Select
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
          : null} */}
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
          <>
            <GroupedSelect
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
          </>
          // <>
          //   <TextField
          //     label="Experience"
          //     placeholder="Experience"
          //     fullWidth
          //     margin="normal"
          //     InputLabelProps={{
          //       shrink: true,
          //     }}
          //     variant="outlined"
          //     name="experience"
          //     value={formik.values.experience}
          //     onChange={formik.handleChange("experience")}
          //   />
          //   {formik.errors.experience && formik.touched.experience && (
          //     <p style={{ color: "red", marginLeft: "5px" }}>
          //       {formik.errors.experience}
          //     </p>
          //   )}
          // </>
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
        {console.log("URL is ", url)}
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
              onChange={uploadImg}
            />
          </div>
        )}
        < Button type="submit" size="small" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div >
  );
}

export default ProfileUpdate;


// const previewImage = async (e) => {
//   setUploadStatus(true);
//   setFormSubmited(false);
//   const fileSampleUrl = await URL?.createObjectURL(e?.target?.files[0]);
//   setImage(fileSampleUrl);
//   setDisableBtn(true);
// };