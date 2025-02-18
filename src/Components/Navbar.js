import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user info

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(); // Ensure navbar updates
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Social Media Feed
                </Typography>

                <Button color="inherit" component={Link} to="/feed">Feed</Button>
                <Button color="inherit" component={Link} to="/create-post">Create Post</Button>

                {user ? (
                    <>
                        <Typography variant="body1" style={{ marginRight: 10 }}>
                            Welcome, {user.username}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
