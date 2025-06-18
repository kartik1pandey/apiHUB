import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const TicketForm = ({ onSubmit, sessionId }) => {
  const [formData, setFormData] = useState({
    query: '',
    email: '',
    username: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tickets', {
        id: uuidv4(),
        query: formData.query,
        contact: { email: formData.email, username: formData.username },
        sessionId,
      });
      onSubmit();
    } catch (err) {
      console.error('Failed to submit ticket:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 12,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" color="primary">
          Create Support Ticket
        </Typography>
        <TextField
          label="Your Question"
          name="query"
          value={formData.query}
          onChange={handleChange}
          required
          multiline
          rows={3}
          variant="outlined"
          size="small"
          inputProps={{ 'aria-label': 'Your question' }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ 'aria-label': 'Your email' }}
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ 'aria-label': 'Your username' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: 'flex-end' }}
          aria-label="Submit ticket"
        >
          Submit
        </Button>
      </Box>
    </motion.div>
  );
};

export default TicketForm;