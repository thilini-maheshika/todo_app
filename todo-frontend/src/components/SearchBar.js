import React, { useState , useEffect} from 'react';
import { Grid, TextField, Button, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

const SearchBar = ({ showAddTaskForm , setSearchResults   }) => {

  const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/todo/search`, {
                  params: { title: searchQuery },
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              });
              setSearchResults(response.data);
          } catch (error) {
              console.error('Error fetching todos:', error);
          }
      };

      if (searchQuery) {
          fetchData();
      } else {
          setSearchResults([]);
      }
  }, [searchQuery, setSearchResults]);

    return (
        <Grid container spacing={1} alignItems="center" style={{ marginBottom: '20px', padding: '10px' }}>
          <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search task"
              value={searchQuery}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                style: {
                  backgroundColor: '#eef2f3', 
                  borderRadius: '10px', 
                  height: '36px',
                  fontSize: '14px',
                  padding: '0 10px'
                }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={showAddTaskForm}
              style={{
                backgroundColor: '#00c853', 
                color: '#fff',
                borderRadius: '20px', 
                height: '36px',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'none',
                padding: '9px' 

              }}
            >
              Add Task
              <AddIcon style={{ marginLeft: '8px' }} />
            </Button>
          </Grid>
        </Grid>
    );
};

export default SearchBar;
