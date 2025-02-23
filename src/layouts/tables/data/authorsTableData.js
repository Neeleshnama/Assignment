



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

// export default function Data() {
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/users") // Replace with your actual API endpoint
//       .then(response => setUsers(response.data))
//       .catch(error => console.error("Error fetching users:", error));
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/api/users/${id}`)
//       .then(() => setUsers(users.filter(user => user._id !== id)))
//       .catch(error => console.error("Error deleting user:", error));
//   };

//   const handleEdit = (user) => {
//     setEditUser(user);
//     setIsModalOpen(true);
//   };

//   const handleSave = () => {
//     axios.put(`http://localhost:5000/api/users/${editUser._id}`, editUser)
//       .then(() => {
//         setUsers(users.map(user => (user._id === editUser._id ? editUser : user)));
//         setEditUser(null);
//         setIsModalOpen(false);
//       })
//       .catch(error => console.error("Error updating user:", error));
//   };

//   const Author = ({ image, name, email }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDAvatar src={image} name={name} size="sm" />
//       <MDBox ml={2} lineHeight={1}>
//         <MDTypography display="block" variant="button" fontWeight="medium">
//           {name}
//         </MDTypography>
//         <MDTypography variant="caption">{email}</MDTypography>
//       </MDBox>
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "Name", accessor: "name", width: "30%", align: "left" },
//       { Header: "Email", accessor: "email", align: "left" },
//       { Header: "Phone", accessor: "phone", align: "center" },
//       { Header: "Instagram", accessor: "insta", align: "center" },
//       { Header: "Actions", accessor: "actions", align: "center" },
//     ],

//     rows: users.map(user => ({
//       name: <Author image={user.image} name={user.name} email={user.email} />,
//       email: <MDTypography variant="caption">{user.email}</MDTypography>,
//       phone: <MDTypography variant="caption">{user.phone}</MDTypography>,
//       insta: (
//         <MDTypography component="a" href={user.insta} variant="caption" color="text" fontWeight="medium">
//           {user.instagram}
//         </MDTypography>
//       ),
//       actions: (
//         <MDBox display="flex" justifyContent="center" gap={1}>
//           <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(user)}>
//             Edit
//           </Button>
//           <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
//             Delete
//           </Button>
//         </MDBox>
//       ),
//     })),

//     modal: (
//       <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Name"
//             margin="dense"
//             value={editUser?.name || ""}
//             onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             margin="dense"
//             value={editUser?.email || ""}
//             onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             label="Phone"
//             margin="dense"
//             value={editUser?.phone || ""}
//             onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => { setIsModalOpen(false); setEditUser(null); }} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     )
//   };
// }




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import { Button } from "@mui/material";

// export default function Data() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/users") // Replace with your actual API endpoint
//       .then(response => setUsers(response.data))
//       .catch(error => console.error("Error fetching users:", error));
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/api/users/${id}`)
//       .then(() => setUsers(users.filter(user => user._id !== id)))
//       .catch(error => console.error("Error deleting user:", error));
//   };

//   const handleEdit = (user) => {
//     const editWindow = window.open("/edit-user", "_blank", "width=600,height=400");
//     if (editWindow) {
//       editWindow.onload = () => {
//         editWindow.document.write(`
//           <html>
//             <head>
//               <title>Edit User</title>
//             </head>
//             <body>
//               <h2>Edit User</h2>
//               <form id="editForm">
//                 <label>Name:</label>
//                 <input type="text" id="name" value="${user.name}" /><br/>
//                 <label>Email:</label>
//                 <input type="text" id="email" value="${user.email}" /><br/>
//                 <label>Phone:</label>
//                 <input type="text" id="phone" value="${user.phone}" /><br/>
//                 <button type="button" onclick="saveUser()">Save</button>
//               </form>
//               <script>
//                 function saveUser() {
//                   const updatedUser = {
//                     name: document.getElementById("name").value,
//                     email: document.getElementById("email").value,
//                     phone: document.getElementById("phone").value,
//                   };
//                   window.opener.postMessage({ type: "updateUser", userId: "${user._id}", data: updatedUser }, "*");
//                   window.close();
//                 }
//               </script>
//             </body>
//           </html>
//         `);
//       };
//     }
//   };

//   useEffect(() => {
//     const handleMessage = (event) => {
//       if (event.data.type === "updateUser") {
//         axios.put(`http://localhost:5000/api/users/${event.data.userId}`, event.data.data)
//           .then(() => {
//             setUsers(users.map(user => (user._id === event.data.userId ? { ...user, ...event.data.data } : user)));
//           })
//           .catch(error => console.error("Error updating user:", error));
//       }
//     };
//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, [users]);

//   const Author = ({ image, name, email }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDAvatar src={image} name={name} size="sm" />
//       <MDBox ml={2} lineHeight={1}>
//         <MDTypography display="block" variant="button" fontWeight="medium">
//           {name}
//         </MDTypography>
//         <MDTypography variant="caption">{email}</MDTypography>
//       </MDBox>
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "Name", accessor: "name", width: "30%", align: "left" },
//       { Header: "Email", accessor: "email", align: "left" },
//       { Header: "Phone", accessor: "phone", align: "center" },
//       { Header: "Instagram", accessor: "insta", align: "center" },
//       { Header: "Actions", accessor: "actions", align: "center" },
//     ],

//     rows: users.map(user => ({
//       name: <Author image={user.image} name={user.name} email={user.email} />,
//       email: <MDTypography variant="caption">{user.email}</MDTypography>,
//       phone: <MDTypography variant="caption">{user.phone}</MDTypography>,
//       insta: (
//         <MDTypography component="a" href={user.insta} variant="caption" color="text" fontWeight="medium">
//           {user.instagram}
//         </MDTypography>
//       ),
//       actions: (
//         <MDBox display="flex" justifyContent="center" gap={1}>
//           <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(user)}>
//             Edit
//           </Button>
//           <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
//             Delete
//           </Button>
//         </MDBox>
//       ),
//     }))
//   };
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Button } from "@mui/material";

export default function Data() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users") // Replace with your actual API endpoint
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error("Error deleting user:", error));
  };

  const handleEdit = (user) => {
    const editWindow = window.open("", "_blank", "width=500,height=500,top=200,left=500");
    if (editWindow) {
      editWindow.document.write(`
        <html>
          <head>
            <title>Edit User</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f4;
              }
              .container {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 300px;
                text-align: center;
              }
              input {
                width: 100%;
                padding: 8px;
                margin: 8px 0;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
              button {
                background: #007bff;
                color: white;
                border: none;
                padding: 10px;
                width: 100%;
                cursor: pointer;
                border-radius: 5px;
                margin-top: 10px;
              }
              button:hover {
                background: #0056b3;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Edit User</h2>
              <form id="editForm">
                <input type="text" id="name" value="${user.name}" placeholder="Name" /><br/>
                <input type="text" id="email" value="${user.email}" placeholder="Email" /><br/>
                <input type="text" id="phone" value="${user.phone}" placeholder="Phone" /><br/>
                <button type="button" onclick="saveUser()">Save</button>
              </form>
              <script>
                function saveUser() {
                  const updatedUser = {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                  };
                  window.opener.postMessage({ type: "updateUser", userId: "${user._id}", data: updatedUser }, "*");
                  window.close();
                }
              </script>
            </div>
          </body>
        </html>
      `);
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "updateUser") {
        axios.put(`http://localhost:5000/api/users/${event.data.userId}`, event.data.data)
          .then(() => {
            setUsers(users.map(user => (user._id === event.data.userId ? { ...user, ...event.data.data } : user)));
          })
          .catch(error => console.error("Error updating user:", error));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [users]);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "30%", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Phone", accessor: "phone", align: "center" },
      { Header: "Instagram", accessor: "insta", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ],

    rows: users.map(user => ({
      name: <Author image={user.image} name={user.name} email={user.email} />, 
      email: <MDTypography variant="caption">{user.email}</MDTypography>,
      phone: <MDTypography variant="caption">{user.phone}</MDTypography>,
      insta: (
        <MDTypography component="a" href={user.insta} variant="caption" color="text" fontWeight="medium">
          {user.instagram}
        </MDTypography>
      ),
      actions: (
        <MDBox display="flex" justifyContent="center" gap={1}>
          <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(user)}>
            Edit
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
            Delete
          </Button>
        </MDBox>
      ),
    }))
  };
}