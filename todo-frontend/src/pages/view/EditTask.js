import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const EditTask = ({ taskId, saveTask, goBack, refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/todo/fetch/${taskId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.date.split("T")[0]);
        setStatus(task.status === "completed" ? "Completed" : "Active");
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSave = async () => {
    try {
      const currentDateTime = new Date().toISOString();
      const updatedTask = {
        title,
        description,
        date: dueDate,
        status: status === "Completed" ? "completed" : "active",
        updated_at: currentDateTime, // Add the current date and time
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/todo/update/${taskId}`,
        updatedTask,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      saveTask({
        _id: taskId,
        text: response.data.title,
        description: response.data.description,
        date: new Date(response.data.date).toLocaleDateString(),
        completed: response.data.status === "completed",
        updated_at: new Date(response.data.updated_at).toLocaleString(), // Format the updated date and time
      });
      goBack();
      refreshTasks(); // Call refreshTasks to update the task list
    } catch (error) {
      console.error("Error updating task:", error);
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
      <Typography variant="h5" style={{ textAlign: 'center'}} gutterBottom>
        Edit Task
      </Typography>
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

export default EditTask;
