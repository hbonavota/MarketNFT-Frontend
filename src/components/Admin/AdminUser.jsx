import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersToAdmin from "../../actions/admin/usersToAdmin";
import { getUsers } from "../../actions/admin/getUsers";
import { Link } from "react-router-dom";
import { deleteUser } from "../../actions/admin/deleteNFT";
import { Button, Grid } from '@material-ui/core'
import {Paper, Typography } from '@mui/material'
import Footer from "../footer/footer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  maincontainer: {
      marginTop: "100px",
      maxWidth: "500px",
      height: "50vh"
  },
  root: {
      // marginTop: "100px"
  },
  button: {
    
  }
  })

export default function AdminUser() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [inputs, setInputs] = useState({
    deleteUser: [],
    users: [],
  });

  function onInputChange(e) {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: inputs[e.target.name].concat(e.target.value),
    });
  }
  async function handleDeleteUser(e) {
    e.preventDefault();
    dispatch(deleteUser(inputs.deleteUser));
    alert("User deleted");
    dispatch(getUsers());
    setInputs({ deleteUser: [""] });
  }

  async function handleRole(e) {
    e.preventDefault();
    dispatch(usersToAdmin(inputs.users));
    alert("Role changed");
    dispatch(getUsers());
    setInputs({ users: [""] });
  }

  return (
    <div>
    <Grid justifyContent="center" container className={classes.root}> 
    <Grid component={Paper} spacing={2} elevation={5} alignItems="center" direction="column" container className={classes.maincontainer}>
      <Link to="/admin">
        <Button color="primary" variant="contained" size="large">
          Back
        </Button>
      </Link>
      <h2>Users</h2>

      <form name="users" onSubmit={(e) => handleRole(e)}>
        <h3>Change role</h3>
        <label htmlFor="">Users To Admin</label>

        <select
        className="input2" 
          name="users"
          onChange={(e) => onInputChange(e)}
          defaultValue=""
        >
          <option value="">Choose User</option>
          {users.map((u) => (
            <option key={u._id} name={u._id} value={u.username}>
              {" "}
              {u.username}{" "}
            </option>
          ))}
        </select>

        {/* <div>
          {users?.map((u) => (
            <div key={u._id}>
              <input
                type="checkbox"
                name="users"
                value={u.username}
                onChange={(e) => onInputChange(e)}
              ></input>
              <div>
                <label name={u.firstName}>
                  {" "}
                  {u.firstName}- {u.username}{" "}
                </label>
              </div>
            </div>
          ))}
        </div> */}
        <Button type="submit" variant="contained" color="primary" size="large">
          Change!
        </Button>
      </form>

      <form onSubmit={(e) => handleDeleteUser(e)}>
        <h3>Delete User</h3>
        <label htmlFor="">Users</label>
        <select
        className="input" 
          name="deleteUser"
          onChange={(e) => onInputChange(e)}
          defaultValue=""
        >
          <option value="">Choose User</option>
          {users.map((u) => (
            <option key={u._id} name={u._id} value={u._id}>
              {" "}
              {u.username}{" "}
            </option>
          ))}
        </select>
        <Button color="primary" type="submit" variant="contained" size="large">
          Delete User!
        </Button>
      </form>
      </Grid>
    </Grid>
      <Footer></Footer>
    </div>
  );
}
