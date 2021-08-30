import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import CustomizedDialogs from "./modal";
import { useSelector } from "react-redux";
import { object } from "yup";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import fallBackImage from "./Student/img/images.png";
// import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  main_img_div: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    // border: "1px solid black",
  },
  profileImg: {
    borderRadius: "50%",
    // border: "1px solid black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // fontSize: 100,
  },
  imgTag: {
    width: "200px",
    height: "200px",
  },
  card_content1: {
    display: "flex",
    justifyContent: "center",
  },
  modal_div: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "20px",
    // boxShadow: "0 0 10px gray",
  },
  show_C_S_Data: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function OutlinedCard({
  campusData,
  updateBtn,
  apply,
  details,
  cardData,
}) {
  const state = useSelector((state) => state);
  const classes = useStyles();
  const student = state.addUser.loginUser.role === "student";
  const company = state.addUser.loginUser.role === "company";
  const admin = state.addUser.loginUser.role === "admin";

  console.log(state.addUser.loginUser.role);
  console.log("campusData=====>", campusData);
  console.log("cardData=====>", cardData);
  console.log("student", student);
  console.log("company", company);
  console.log("admin", admin);

  return (
    <Grid container justifyContent="center">
      <Grid item xl={2} md={4} sm={6} xs={12}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div className={classes.main_img_div}>
              <div className={classes.profileImg}>
                {campusData.fileToUpload ? (
                  <img
                    className={classes.imgTag}
                    src={campusData.fileToUpload}
                    alt="profilePic"
                  />
                ) : (
                  <img
                    className={classes.imgTag}
                    src={fallBackImage}
                    alt="fallBackImage"
                  />
                )}
              </div>
            </div>
            <div className={classes.card_content1}>
              <div>
                <Typography variant="body2" component="p">
                  {details
                    ? null
                    : `Name : ${campusData?.name || cardData?.name}`}
                  {/* {campusData.name ? `Name :${campusData.name}` : null} */}
                </Typography>
                <Typography variant="body2" component="p">
                  {details
                    ? null
                    : `Email : ${campusData?.email || cardData?.email}`}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.jobTitle
                    ? `Available Jobs : ${campusData.jobTitle}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.dob
                    ? `Date Of Birth : ${campusData.dob || cardData?.dob}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.education
                    ? `Education : ${
                        campusData.education || cardData?.education
                      }`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.cgpa
                    ? `CGPA : ${campusData.cgpa || cardData?.cgpa}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.skills
                    ? `Skills : ${campusData.skills || cardData?.skills}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.experience
                    ? `Experience : ${
                        campusData.experience || cardData?.experience
                      }`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {(company || student) && details
                    ? null
                    : `Phone : ${campusData?.phone || cardData?.phone}`}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.description
                    ? `Job Description : ${campusData.description}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.lastDate
                    ? `Last Date : ${campusData.lastDate}`
                    : null}
                </Typography>
                <Typography variant="body2" component="p">
                  {student && campusData?.salary
                    ? `Salary : ${campusData.salary}`
                    : null}
                </Typography>
              </div>
            </div>
            {(company || student) && details ? (
              <div className={classes.show_C_S_Data}>
                <div>
                  <List>
                    <ListItem>{campusData?.name}</ListItem>
                  </List>
                </div>
                <div>
                  <CardActions>
                    <CustomizedDialogs cardData={campusData} />
                  </CardActions>
                </div>
              </div>
            ) : null}
            {updateBtn ? (
              <div className={classes.modal_div}>
                <div>
                  <CardActions>
                    <CustomizedDialogs cardData={campusData} icons />
                  </CardActions>
                </div>
              </div>
            ) : null}
            {apply ? (
              <div className={classes.modal_div}>
                <div>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary">
                      Apply Now
                    </Button>
                  </CardActions>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
