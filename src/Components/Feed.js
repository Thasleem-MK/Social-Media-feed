import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Container, Grid, Box, TextField } from '@mui/material';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [commentText, setCommentText] = useState({});

    const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user info
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts', {
            headers: token ? { Authorization: token } : {}
        }).then((response) => {
            setPosts(response.data);
        }).catch(err => console.error(err));

        // Fetch user's own posts
        if (token) {
            axios.get('http://localhost:5000/api/my-posts', {
                headers: { Authorization: token }
            }).then((response) => {
                setMyPosts(response.data);
            }).catch(err => console.error(err));
        }
    }, []);


    const handleLike = (postId, isLiked) => {
        if (!token) {
            alert("Please log in to like posts.");
            return;
        }

        axios.put(`http://localhost:5000/api/posts/${postId}/like`, {}, {
            headers: { Authorization: token }
        }).then(() => {
            setPosts(posts.map(post =>
                post.id === postId
                    ? { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1, likedByUser: !isLiked }
                    : post
            ));
        }).catch(err => console.error(err));
    };

    const handleAddComment = (postId) => {
        if (!token) {
            alert("Please log in to comment.");
            return;
        }

        const comment = commentText[postId]; // Get comment for that post

        if (!comment || comment.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }

        axios.post(`http://localhost:5000/api/posts/${postId}/comments`, { comment }, {
            headers: { Authorization: token }
        }).then((response) => {
            setPosts(posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [...(post.comments || []), { id: response.data.id, comment }]
                    }
                    : post
            ));
            setCommentText({ ...commentText, [postId]: "" }); // Clear input field
        }).catch(err => console.error(err));
    };


    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Social Media Feed
            </Typography>
            <Grid container spacing={3}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card
                            sx={{
                                height: 400, // Ensures all cards have the same height
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: 2
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {post.username}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        maxHeight: "80px", // Set a max height to avoid overflow issues
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3, // Limits text to 3 lines
                                        WebkitBoxOrient: "vertical"
                                    }}
                                >
                                    {post.content}
                                </Typography>
                                {post.image_url && (
                                    <Box sx={{
                                        width: "100%",
                                        height: "200px", // Ensures images have a fixed size
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: 2
                                    }}>
                                        <img
                                            src={`http://localhost:5000${post.image_url}`}
                                            alt="Post"
                                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    </Box>
                                )}
                            </CardContent>
                            <Box display="flex" justifyContent="center" padding={1}>
                                <Button
                                    variant={post.likedByUser ? "contained" : "outlined"}
                                    color="primary"
                                    onClick={() => handleLike(post.id, post.likedByUser)}
                                >
                                    {post.likedByUser ? "Unlike" : "Like"} ({post.likes})
                                </Button>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    placeholder="Write a comment..."
                                    value={commentText[post.id] || ""}
                                    onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddComment(post.id)}
                                >
                                    Comment
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Container>
    );
};

export default Feed;