import "../../App.css";
import React from "react";
import { useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CustomizedDialogs from "../../Components/modal";
import { database } from "../../Config/firebaseConfig";

function Students() {
  const allUsers = useSelector((state) => state.addUser);
  const allStudents = Object.values(allUsers.allUsers)?.filter(
    (userData) => userData.role === "student"
  );
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#3f51b5",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      paddingRight:"25px"
    },
    button: {
      margin: "10px",
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
  });

  const classes = useStyles();

  const userBlock = (blockUserId, block) => {
    if (block === false) {
      database
        .ref("/CRA")
        .child("users/" + blockUserId)
        .update(
          { block: true, }
        ).then((res) => {
        }).catch((res) => {
        })
    } else {
      database
        .ref("/CRA")
        .child("users/" + blockUserId)
        .update(
          { block: false, }
        )
    }
  }

  return (
    <div className="marginAdjustment">
      <Grid container justifyContent="center">
        <Grid xs={11} md={11} sm={11} xl={11} item>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Students</StyledTableCell>
                  <StyledTableCell align="right" className={classes.table}>Details</StyledTableCell>
                  {allUsers.loginUser.role === "admin" ?
                    <StyledTableCell align="right" className={classes.table}>Block User</StyledTableCell> : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudents.length === 0 ? "Student Not Found" 
                :allStudents &&
                  allStudents.map((data, index) => {
                    return (
                      <StyledTableRow key={index} >
                        <StyledTableCell component="th" scope="row">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <CustomizedDialogs
                            campusData={data}
                            details
                            formTitle={"Student Details"}
                            studentDetails />
                        </StyledTableCell>
                        {allUsers.loginUser.role === "admin" ?
                          <StyledTableCell align="right">
                            <Button
                              className={classes.button}
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => userBlock(data.id, data.block)}>
                              {data.block === true ? "Unblock" : "Block"}
                            </Button>
                          </StyledTableCell>
                          : null
                        }
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
export default Students;
