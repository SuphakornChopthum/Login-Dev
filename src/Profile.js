import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Container,CssBaseline,Avatar, Grid, TextField } from "@mui/material";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Profile() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token === undefined || token === null) {
      MySwal.fire({
        html: <i>ไม่พบ </i>,
        icon: "error",
      }).then(() => navigate("/login"));
    }
    fetch("https://www.mecallapi.com/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          setIsLoaded(false);
          setUser(result.user);
        } else if (result.status === "forbidden") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          }).then(() => navigate("/login"));
        }
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          html: <i>'login ไม่สำเร็จ'</i>,
          icon: "error",
        });
      });
  }, []);

  const logout = () => {
      localStorage.removeItem('token');
      navigate('/login')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

      
  

  if (isLoaded) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
          <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user.avatar} alt={user.username} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
                
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  autoFocus
                  value={user.fname || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  name="lname"
                  autoComplete="family-name"
                  value={user.lname || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={user.username || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={user.email || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="avatar"
                  id="avatar"
                  autoComplete="avatar"
                  value={user.avatar || ""}
                />
              </Grid> 
            </Grid>
          </Box>
        </Box>
      </Container>

        {/* <div>{data.fname}</div>
        <div>{data.lname}</div>
        <div>{data.name}</div>
        <div>{data.email}</div>
        <img src={data.avatar} alt={data.id} width={100}></img>
        <div><button onClick={logout}>Logout</button></div> */}
      </div>

    );
  }
}

export default Profile;
