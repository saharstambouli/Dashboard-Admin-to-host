import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Box,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const DashboardAdmin = () => {
  const [userCount, setUserCount] = useState(null);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/getusers`);
      setUserCount(response.data.count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/send-updates`, { subject, content });
      setMessage(response.data.message);
      console.log(response.data.message);
      setSubject('');
      setContent('');
    } catch (error) {
      setMessage('Error sending newsletter: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Dashboard Admin
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Count
        </Typography>
        {userCount !== null ? (
          <Typography variant="h3">{userCount}</Typography>
        ) : (
          <CircularProgress />
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Send Newsletter
        </Typography>
        <Box component="form" onSubmit={handleSendNewsletter} noValidate>
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Sending...' : 'Send Newsletter'}
          </Button>
        </Box>
        {message && (
          <Typography color={message.includes('Error') ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default DashboardAdmin;