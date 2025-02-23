// import React, { useState } from "react";
// import { Button, TextField, Stepper, Step, StepLabel, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import axios from "axios";

// const AddUserForm = () => {
//   const [open, setOpen] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [userData, setUserData] = useState({ name: "", email: "", phone: "", instagram: "", youtube: "" });

//   const steps = ["Basic Details", "Social Details", "Finish"];

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleNext = async () => {
//     if (activeStep === steps.length - 1) {
//       await axios.post("http://localhost:5000/api/users", userData);
//       setOpen(false);
//       setUserData({ name: "", email: "", phone: "", instagram: "", youtube: "" });
//       setActiveStep(0);
//     } else {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   return (
//     <>
//       <IconButton color="primary" onClick={() => setOpen(true)}>
//         <AddCircleIcon fontSize="large" />  Add User
//       </IconButton>

//       <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Add User</DialogTitle>
//         <DialogContent>
//           <Stepper activeStep={activeStep}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>

//           {activeStep === 0 && (
//             <>
//               <TextField fullWidth margin="normal" label="Name" name="name" value={userData.name} onChange={handleChange} />
//               <TextField fullWidth margin="normal" label="Email" name="email" value={userData.email} onChange={handleChange} />
//               <TextField fullWidth margin="normal" label="Phone" name="phone" value={userData.phone} onChange={handleChange} />
//             </>
//           )}
//           {activeStep === 1 && (
//             <>
//               <TextField fullWidth margin="normal" label="Instagram ID" name="instagram" value={userData.instagram} onChange={handleChange} />
//               <TextField fullWidth margin="normal" label="YouTube Link" name="youtube" value={userData.youtube} onChange={handleChange} />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default AddUserForm;



import React, { useState } from "react";
import { Button, TextField, Stepper, Step, StepLabel, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

const AddUserForm = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", instagram: "", youtube: "" });

  const steps = ["Basic Details", "Social Details", "Finish"];

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);
    
    if (activeStep === steps.length - 1) {
      await axios.post("http://localhost:5000/api/users", userData);
      setOpen(false);
      setUserData({ name: "", email: "", phone: "", instagram: "", youtube: "" });
      setActiveStep(0);
      setCompleted({});
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <AddCircleIcon fontSize="large" /> Add User
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={!!completed[index]}>
                <StepLabel icon={completed[index] ? <CheckCircleIcon color="success" /> : undefined}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box minHeight={200} display="flex" flexDirection="column" justifyContent="center">
            {activeStep === 0 && (
              <>
                <TextField fullWidth margin="normal" label="Name" name="name" value={userData.name} onChange={handleChange} />
                <TextField fullWidth margin="normal" label="Email" name="email" value={userData.email} onChange={handleChange} />
                <TextField fullWidth margin="normal" label="Phone" name="phone" value={userData.phone} onChange={handleChange} />
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField fullWidth margin="normal" label="Instagram ID" name="instagram" value={userData.instagram} onChange={handleChange} />
                <TextField fullWidth margin="normal" label="YouTube Link" name="youtube" value={userData.youtube} onChange={handleChange} />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUserForm;
