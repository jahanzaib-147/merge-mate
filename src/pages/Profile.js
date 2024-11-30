import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { getUserProfile, updateUserProfile } from "../firebase/firebaseHelper";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    techStack: "",
    experience: "",
  });

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const profileData = await getUserProfile(user.uid);
        setProfile(profileData);
        setFormValues({
          name: profileData.name || "",
          techStack: profileData.techStack.join(", ") || "",
          experience: profileData.experience || "",
        });
      };
      fetchProfile();
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    const updatedProfile = {
      name: formValues.name,
      techStack: formValues.techStack.split(",").map((tech) => tech.trim()),
      experience: formValues.experience,
    };
    await updateUserProfile(user.uid, updatedProfile);
    setProfile(updatedProfile);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  if (!profile) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        {isEditing ? "Edit Profile" : "Your Profile"}
      </Typography>

      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Avatar
          src={profile.profilePic}
          alt="Profile Picture"
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Name:
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your name"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        ) : (
          <Typography variant="body1">{profile.name}</Typography>
        )}
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tech Stack:
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={formValues.techStack}
            onChange={(e) => handleChange("techStack", e.target.value)}
            placeholder="E.g. React, Node.js, Python"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        ) : (
          <Typography variant="body1">
            {profile.techStack.join(", ")}
          </Typography>
        )}
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Experience:
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={formValues.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="Enter your experience level"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        ) : (
          <Typography variant="body1">{profile.experience}</Typography>
        )}
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Box sx={{ textAlign: "center" }}>
        {isEditing ? (
          <>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
              sx={{ marginRight: 1 }}
            >
              Save
            </Button>
            <Button
              startIcon={<CancelIcon />}
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <IconButton
            onClick={() => setIsEditing(true)}
            color="primary"
            size="large"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
