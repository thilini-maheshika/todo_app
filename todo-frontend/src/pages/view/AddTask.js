import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Alert
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const AddTask = ({ goBack , refreshTasks}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      status: status.toLowerCase() 
    };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/todo`,
        taskData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.status === 201) {
        setSuccess("Task added successfully");
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus("Active");
        setTimeout(() => {
          goBack(); 
          refreshTasks();
        }, 2000);
      } else {
        setError("Failed to add task");
      }
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };
  

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton onClick={goBack} style={{ marginRight: "8px" }}>
          <ArrowBack />
        </IconButton>
      </Box>
      <Typography variant="h5" style={{ textAlign: "center" }} gutterBottom>
        Add Task to List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="20px"
          flexDirection="column"
          gap="10px"
        >
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={goBack}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddTask;
