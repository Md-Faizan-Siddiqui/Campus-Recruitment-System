import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ProfileUpdate from "../Pages/SharedPages/profileUpdate";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import OutlinedCard from "./card";
import JobPostForm from "../Pages/jobPostForm";
import EditButton from "../Components/editButton";
import Accordion from "./accordion"
import { makeStyles } from "@material-ui/core/styles";
import VacanciesCard from "./vacanciesCard";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 5px 0px 5px",
    padding: "8px 15px",
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
}));
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
  student,//card
  formTitle,
  icons,
  // apply,
  campusData,
  btnText,
  jobPost,
  companyDetails,
  studentDetails,
  appliedCandidate
}) {
  console.log("Form Title======>in Modal", formTitle);
  console.log("Icons======>in Modal", icons);
  console.log("Campus Data======>in Modal", campusData);
  console.log("Btn Text======>in Modal", btnText);
  console.log("Job Post======>in Modal", jobPost);
  console.log("Company Details======>in Modal", companyDetails);
  console.log("Student Details======>in Modal", studentDetails);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {jobPost ? <EditButton onClick={handleClickOpen} />
        : icons || btnText ? (
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            size="small"
            // disabled={student ? campusData.block : false}
            onClick={handleClickOpen}
          >
            {btnText ? btnText : "Edit Profile"}
          </Button>
        )
          :
          (
            <Button onClick={handleClickOpen}>
              <InfoOutlinedIcon color="primary" />
            </Button>
          )
      }
      {open && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {icons || studentDetails || companyDetails || jobPost || appliedCandidate
              ? formTitle
              : null}
          </DialogTitle>
          <DialogContent dividers>
            {console.log("abc", campusData)}
            {icons ? (
              <ProfileUpdate
                campusData={campusData}
                handleClose={handleClose}
                icons={icons}
              />
            )
              : jobPost ? (
                <JobPostForm handleClose={handleClose} />
              ) : appliedCandidate ?
                <Accordion campusData={campusData} />
                : (<>
                  <VacanciesCard
                  modal
                    showImg
                    web
                    campusData={campusData}
                    handleClose={handleClose} />
                  {/* <OutlinedCard
                    showImg
                    web
                    campusData={campusData}
                    handleClose={handleClose}
                  /> */}
                </>
                )
            }
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
