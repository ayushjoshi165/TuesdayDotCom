import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./formField.css";

export default function UpdateUser({ id, refreshData }) {
  const [name, setName] = useState("");
  const [permission_id, setPermissionId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then((response) => {
        const user = response.data;
        setName(user.name);
        setPermissionId(user.permission_id);
        setEmail(user.email);
      })
      .catch((error) => {
        console.log("Error getting the user from id", error);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, permission_id, email };
      setName(updatedUser.name);
      setPermissionId(updatedUser.permission_id);
      setEmail(updatedUser.email);

      console.log("Inside update User" + updatedUser.name);
      console.log("id", +id);
      const response = await axios.put(
        `http://localhost:8080/users/${id}`,
        updatedUser
      );
      refreshData();
      console.log("user updated Sucessfully", response.data);
      
    } catch (error) {
      console.log("Error updating the user", error);
    }
  };
  const deleteUser = async (e) => {
    console.log("Delete called with id" + id);
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:8080/users/${id}`);
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.log("Error deleteing the user", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <div className="form-container">
          <div className="form-row">
            <label className="label-left">Name:</label>
            <input
              type="text"
              className=""
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="label-left">Email:</label>
            <input
              type="text"
              className=""
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="label-left">P_ID:</label>
            <input
              type="text"
              className=""
              name="permission_id"
              value={permission_id}
              onChange={(e) => setPermissionId(e.target.value)}
            />
          </div>
          {/* Add more form rows as needed */}
        </div>
        {/* <div>
          <label>Name :</label>

          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Permission ID :</label>

          <input
            type="text"
            name="permission_id"
            value={permission_id}
            onChange={(e) => setPermissionId(e.target.value)}
          />
        </div> */}
        <button type="submit">
          Update
          {/* <i className="fa fa-pencil"></i> */}
        </button>

        {/* <button onClick={deleteUser}>Delete User</button>
      <button type="submit">Update User</button> */}
      </form>
      <DeleteIcon onClick={deleteUser}> </DeleteIcon>
      {/* <i className="fa fa-trash" onClick={deleteUser}></i> Delete icon */}
    </div>
  );
}
