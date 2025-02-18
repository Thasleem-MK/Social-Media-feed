import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to create a post.");
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setContent('');
            setImage(null);
            alert('Post created successfully!');
        } catch (err) {
            console.error(err);
            alert("Error creating post.");
        }
    };


    return (
        <Container>
            <Typography variant="h4" gutterBottom>Create Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <Button type="submit" variant="contained" color="primary">
                    Post
                </Button>
            </form>
        </Container>
    );
};

export default CreatePost;