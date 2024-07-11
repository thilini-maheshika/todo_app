import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import Checklist from "../assets/img/checklist.png";
import Menu from "../assets/img/menu.png";

const Header = () => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" style={{ padding: '10px 0' }}>
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton>
          <img src={Checklist} width={25} height={25} alt="Checklist" />
        </IconButton>
        <Typography variant="h5" style={{ fontWeight: 'bold'}}>To-do List</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
