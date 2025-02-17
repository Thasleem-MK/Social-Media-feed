import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Button, TextField, Container } from '@mui/material';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts from the backend
  useEffect(() => {
    // axios.get('http://localhost:5000/api/posts').then((response) => {
    //   setPosts(response.data);
    // });
  }, []);

  // Handle creating a new post
  const handleCreatePost = () => {
    // axios.post('http://localhost:5000/api/posts', {
    //   user_id: 1, // Replace with logged-in user ID
    //   content: newPost,
    //   image_url: '' // Add image URL if needed
    // }).then((response) => {
    //   setPosts([...posts, { id: response.data.id, content: newPost, likes: 0 }]);
    //   setNewPost('');
    // });
  };

  // Handle liking a post
  const handleLike = (postId) => {
    // axios.put(`http://localhost:5000/api/posts/${postId}/like`).then(() => {
    //   setPosts(posts.map((post) =>
    //     post.id === postId ? { ...post, likes: post.likes + 1 } : post
    //   ));
    // });
  };

  return (
    <Container>
      <h1>Social Media Feed</h1>
      <TextField
        label="New Post"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleCreatePost}>
        Post
      </Button>
      {posts.map((post) => (
        <Card key={post.id} style={{ margin: '16px 0', padding: '16px' }}>
          <Typography variant="h6">{post.username}</Typography>
          <Typography>{post.content}</Typography>
          <Button onClick={() => handleLike(post.id)}>
            Like ({post.likes})
          </Button>
        </Card>
      ))}
    </Container>
  );
};

export default App;