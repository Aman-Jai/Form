import * as React from 'react';
import axios from 'axios';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent
  from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormHelperText } from '@mui/material';

function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [year, setYear] = React.useState("");
  const [semester, setSemester] = React.useState("");
  // Add state variables to track error state for each field
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [contactError, setContactError] = React.useState(false);
  const [courseError, setCourseError] = React.useState(false);
  const [yearError, setYearError] = React.useState(false);
  const [semesterError, setSemesterError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reset error states
    setNameError(false);
    setEmailError(false);
    setContactError(false);
    setCourseError(false);
    setYearError(false);
    setSemesterError(false);
    // Check for empty fields and set error states accordingly
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!contact) setContactError(true);
    if (!course) setCourseError(true);
    if (!year) setYearError(true);
    if (!semester) setSemesterError(true);

    // If any field is empty, prevent submission
    if (nameError || emailError || contactError || courseError || yearError || semesterError) {
      return; // Prevent submission
    }

    const formData = {
      name: name,
      email: email,
      contact: contact,
      course: course,
      year: year,
      semester: semester
    };

    axios.post('http://localhost:5000/submit', formData)
      .then((res) => {
        console.log(res.data);
        handleClickOpen(); // Open the dialog after successful submission
        // Clear the form fields after submission
        setName("");
        setEmail("");
        setContact("");
        setCourse("");
        setYear("");
        setSemester("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm" className='form'>
      <Box sm={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography component="h1" variant="h4" className="form-title">
          Google Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError} // Show error state if name is empty
          />
          <FormHelperText error={nameError}>This is a required</FormHelperText> 
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError} // Show error state if name is empty
          />
          <FormHelperText error={emailError}>This is a required</FormHelperText> 
          <TextField
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Contact"
            name="contact"
            autoComplete="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            error={contactError} // Show error state if name is empty
          />
          <FormHelperText error={contactError}>This is a required</FormHelperText> 
          <TextField
            margin="normal"
            required
            fullWidth
            id="course"
            label="Course"
            name="course"
            autoComplete="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            error={courseError} // Show error state if name is empty
          />
          <FormHelperText error={courseError}>This is a required</FormHelperText> 
          <TextField
            margin="normal"
            required
            fullWidth
            id="year"
            label="Year"
            name="year"
            autoComplete="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            error={yearError} // Show error state if name is empty
          />
          <FormHelperText error={yearError}>This is a required</FormHelperText> 
          <TextField
            margin="normal"
            required
            fullWidth
            id="semester"
            label="Semester"
            name="semester"
            autoComplete="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            error={semesterError} // Show error state if name is empty
          />
          <FormHelperText error={semesterError}>This is a required</FormHelperText> 
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="sub"
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className='Dia'>
        <DialogTitle
          id="alert-dialog-title">
          {"Form Submitted"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your form has been submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions  sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </Container>
  );
}

export default App;