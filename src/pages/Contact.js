import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent successfully!");
    setMessage(""); // Clear the form after submission
  };

  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "700px",
          mx: "auto",
          mb: 5,
          fontSize: "1.2rem",
        }}
      >
        Got questions or feedback? We’d love to hear from you. Reach out to us using the form below
        or through the provided contact details.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "12px",
              p: 3,
              boxShadow: 3,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
            >
              Send Us a Message
            </Typography>
            <TextField
              label="Your Message"
              multiline
              rows={6}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root:hover": {
                  borderColor: "primary.main",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontSize: "1rem",
                py: 1,
                backgroundColor: "#00457C",
                "&:hover": {
                  backgroundColor: "#003366",
                },
              }}
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "12px",
              p: 3,
              boxShadow: 3,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
              >
                Contact Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">+92 345 678901</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">dryrun@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">Karachi,Pakistan</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
