import React from "react";
import { useState } from "react";
import axios from "axios";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function UserForm({ refreshData }) {
  const [name, setName] = useState("");
  const [permission_id, setPermissionId] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, permission_id };
      const response = await axios.post("http://localhost:8080/users", newUser);
      console.log("User successfully added", response.data);

      // Call the callback function to refresh data in the parent component
      console.log("refresh data" + refreshData);
      if (refreshData) {
        refreshData();
      }
      //clear the form after submission
      setName("");
      setPermissionId("");
      setEmail("");
    } catch (error) {
      console.log("Error adding new user", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email :</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Permission ID :</label>
        <input
          type="text"
          value={permission_id}
          onChange={(e) => setPermissionId(e.target.value)}
        />
      </div>
      <button type="submit"><PersonAddAltIcon/></button>
    </form>
  );
}
