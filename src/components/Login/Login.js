import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuth, setUser } from "../../Reducers/UserReducer";
import { login, getUser } from "../../API/user";

import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Alert,
  Box
} from '@mui/material';
import { ResponsiveContainer } from 'recharts';

const  AdminLogin= () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  console.log("isAuthenticated",isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminLogin component mounted");
  
    if (isAuthenticated) {
    
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
  
    try {
      const response = await login(email, password);
      console.log("email", email);
      console.log("response login", response);
  
      if (response?.email) {
        setErrors({ email: response.email });
      } else if (response?.password) {
        setErrors({ password: response.password });
      } else if (response?.token) {
        localStorage.setItem("token", response.token);
        dispatch(setIsAuth(true));
  
        const userData = await getUser();
        if (userData) {
          dispatch(setUser({ email: userData.email}));
          
          // Redirection après mise à jour de l'utilisateur
          navigate("/");
        } else {
          setErrors({ general: "Failed to retrieve user data." });
        }
      } else {
        setErrors({ general: "Unexpected response from the server." });
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        width: '100%'
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors && Object.values(errors).length > 0 && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {Object.values(errors).join(', ')}  {/* Show error messages */}
              </Alert>
            )}
            <CardActions sx={{ justifyContent: 'flex-end', pt: 2 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminLogin;
