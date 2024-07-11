import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
  Checkbox,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    let endpoint = `${process.env.REACT_APP_API_ENDPOINT}/todo/all`;
    if (activeTab === 1) endpoint = `${process.env.REACT_APP_API_ENDPOINT}/todo/today`;
    if (activeTab === 2) endpoint = `${process.env.REACT_APP_API_ENDPOINT}/todo/completed`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = response.data;
      setTasks(data.map(task => ({
        _id: task._id,
        text: task.title,
        description: task.description,
        date: new Date(task.date).toLocaleDateString("en-US"),
        completed: task.status === "completed"
      })));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setTasks([]);
      } if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [activeTab]);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      fetchTasks(); 
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/todo/search/${query}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = response.data;
      setTasks(data.map(task => ({
        _id: task._id,
        text: task.title,
        description: task.description,
        date: new Date(task.date).toLocaleDateString("en-US"),
        completed: task.status === "completed"
      })));
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/todo/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompletion = async (id) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    try {
      await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/todo/update/${id}`, {
        status: taskToUpdate.completed ? "active" : "completed"
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const showAddTaskForm = () => {
    setShowAddTask(true);
  };

  const handleGoBack = () => {
    setShowAddTask(false);
    setEditTaskId(null);
  };

  const startEditingTask = (id) => {
    setEditTaskId(id);
  };

  const saveTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setEditTaskId(null);
  };

  const refreshTasks = () => {
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return !task.completed;
    if (activeTab === 2) return task.completed;
    return true;
  });

  const handleOpenDialog = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      {showAddTask ? (
        <AddTask goBack={handleGoBack} refreshTasks={refreshTasks} />
      ) : editTaskId !== null ? (
        <EditTask 
          taskId={editTaskId}
          saveTask={saveTask} 
          goBack={handleGoBack}
          refreshTasks={refreshTasks}
        />
      ) : (
        <>
          <Header />
          <SearchBar showAddTaskForm={showAddTaskForm} handleSearch={handleSearch} setSearchResults={setSearchResults} />

          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
            style={{ color: 'red' }}
          >
            <Tab label="All" />
            <Tab label="Today" />
            <Tab label="Completed" />
          </Tabs>

          <List>
            {(searchResults.length > 0 ? searchResults : filteredTasks).map((task) => (
              <Box key={task._id}>
                <ListItem
                  button
                  onClick={() => handleOpenDialog(task)}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "#fff"
                  }}
                >
                  <Checkbox
                    edge="start"
                    checked={!!task.completed}
                    tabIndex={-1}
                    disableRipple
                    color="success"
                    onClick={() => toggleCompletion(task._id)}
                  />
                  <ListItemText
                    primary={task.text}
                    secondary={task.date}
                    style={{
                      textDecoration: task.completed ? "line-through" : "none"
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTask(task._id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton edge="end" aria-label="edit" onClick={() => startEditingTask(task._id)}>
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>

          {selectedTask && (
            <Dialog
              open={isDialogOpen}
              onClose={handleCloseDialog}
              aria-labelledby="task-details-dialog-title"
            >
              <DialogTitle id="task-details-dialog-title">{selectedTask.text}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectedTask.description}
                </DialogContentText>
                <DialogContentText>
                  Date: {selectedTask.date}
                </DialogContentText>
                <DialogContentText>
                  Status: {selectedTask.completed ? "Completed" : "Active"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
