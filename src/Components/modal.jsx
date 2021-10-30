import React from "react";
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
  secondChild: {
    borderLeft: "none",
    borderTop: "1px solid #eaeff5",
    paddingTop: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
  dialogCardSm: {
    minWidth: "90%",
  },
  widthAdjustment:{
    minWidth:"250px",
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
  campusData,
  btnText,
  jobPost,
  companyDetails,
  studentDetails,
  appliedCandidate
}) {

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
          <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.widthAdjustment}>
            {icons || studentDetails || companyDetails || jobPost || appliedCandidate
              ? formTitle
              : null}
          </DialogTitle>
          <DialogContent dividers>
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
                    className={classes.secondChild}
                    modal
                    // showImg
                    // web
                    campusData={campusData}
                    handleClose={handleClose} />
                </>
                )
            }
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
