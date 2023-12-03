import { useState, useEffect } from "react";
import axios from "axios";
import UpdateUser from "./UpdateUser";
import UserForm from "./UserForm";
import "./table-styles.css";
import "font-awesome/css/font-awesome.min.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // delete

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${id}`);
      if (response.status === 200) {
        // Deletion was successful, so refresh your data
        getUsersData();
      } else {
        console.log("Error deleting the user");
      }
    } catch (error) {
      console.log("Error deleting the user", error);
    }
  };

  const handleEditClick = (user, data) => {
    console.log("handle click user" + user);
    console.log("handle click user" + data);
    const updatedData = data.map((item) => ({
      ...item,
      open: item.id === user.id ? !item.open : false,
    }));
    console.log(user);
    setData(updatedData); // Update the data state
    setEditingUser(user);

    setOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    // Perform the update logic here, e.g., make an API request
    // You can also update your local user data
    // Close the dialog for the specific user by setting 'open' to false
    const updatedData = data.map((item) => ({
      ...item,
      open: false,
    }));

    setData(updatedData);

    // Close the dialog
    setOpen(false);
  };

  const getUsersData = () => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setData(response.data.map((user) => ({ ...user, open: false })));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="table-container">
      <UserForm refreshData={getUsersData} />
      <span>Refresh list</span> <RefreshIcon onClick={getUsersData} />
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permission ID</th>

              <th>Update</th>
              <th>Delete </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>

                <td>{item.permissionId}</td>

                <td>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(item, data)}
                  >
                    <EditIcon />
                    {/* <i className="fa fa-pencil"></i> Edit  */}
                  </Button>

                  <Dialog
                    open={item.open}
                    onClose={() => handleUpdateUser(item)}
                  >
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                      <UpdateUser
                        id={item.id}
                        refreshData={getUsersData}
                        user={editingUser}
                        onUpdate={handleUpdateUser} // Pass the update function
                        // onUpdate={UpdateUser}
                        onClose={() => setOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </td>

                <td>
                  <DeleteIcon onClick={() => deleteUser(item.id)} />{" "}
                  {/* Use the DeleteIcon here */}
                  {/* <i className="fa fa-trash"></i> Delete icon */}
                  {/* <UpdateUser id={item.id} refreshData={getUsersData} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users to display.</p>
      )}
    </div>
  );
}
