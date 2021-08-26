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
import ProfileUpdate from "./profileUpdate";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import OutlinedCard from "./card";

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

export default function CustomizedDialogs({ icons }) {
  // console.log("imgURL", imgURL);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(icons);
  return (
    <div>
      {icons ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClickOpen}
        >
          Update Profile
        </Button>
      ) : (
        <Button onClick={handleClickOpen}>
          <InfoOutlinedIcon color="primary" />
        </Button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Registration Form
        </DialogTitle>
        <DialogContent dividers>
          {icons ? (
            <ProfileUpdate handleClose={handleClose} />
          ) : (
            <OutlinedCard handleClose={handleClose} />
          )}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Update
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
