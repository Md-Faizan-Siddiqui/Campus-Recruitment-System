import React from "react";
import { useSelector } from "react-redux";
import OutlinedCard from "../../Components/card";
import "../../App.css";
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
  // const role = useSelector((state) => state.addUser.loginUser.role);
  // console.log("Role===>in students", role)
  const allUsers = useSelector((state) => state.addUser);
  const allStudents = Object.values(allUsers.allUsers)?.filter(
    (userData) => userData.role === "student"
  );
  console.log("role====>in students", allUsers.loginUser.role)
  console.log(allStudents)
  console.log(allUsers)
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
      // minWidth: 700,
    },
    button: {
      margin: "10px",
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
  });

  const classes = useStyles();

  const userBlock = (blockUserId, block) => {
    // alert("User Block Function")
    console.log("Block User Id=====>", blockUserId)
    console.log("User Block=====>", block)
    if (block === false) {
      database
        .ref("/CRA")
        .child("users/" + blockUserId)
        .update(
          { block: true, }
        ).then((res) => {
          console.log("then =====>")
        }).catch((res) => {
          console.log("catch ====>")
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
      <h1>Students</h1>
      <Grid container justifyContent="center">
        <Grid xs={11} md={11} sm={11} xl={11} item>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Students</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  {allUsers.loginUser.role === "admin" ?
                    <StyledTableCell></StyledTableCell> : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudents &&
                  allStudents.map((data, index) => {
                    return (
                      <StyledTableRow >
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
