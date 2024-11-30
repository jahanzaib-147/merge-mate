import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { updateUserProfile } from "../../firebase/firebaseHelper";
import { TextField, Button, Box, Typography } from "@mui/material";

const EditProfile = () => {
  const { user } = useAuth();
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    if (user) {
      setTechStack(user?.techStack?.join(", "));
      setExperience(user?.experience || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    const updatedProfile = {
      techStack: techStack.split(",").map((tech) => tech.trim()),
      experience,
    };
    await updateUserProfile(user.uid, updatedProfile);
    alert("Profile updated successfully!");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Edit Profile</Typography>
      <TextField
        label="Tech Stack (comma-separated)"
        fullWidth
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Experience Level"
        fullWidth
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSaveProfile}>
        Save Profile
      </Button>
    </Box>
  );
};

export default EditProfile;
