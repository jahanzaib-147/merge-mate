import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent!");
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <TextField
        label="Your Message"
        multiline
        rows={6}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Send Message
      </Button>
    </Box>
  );
};

export default Contact;
