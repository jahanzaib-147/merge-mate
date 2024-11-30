import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { getUserProfile } from "../../firebase/firebaseHelper";
import { Box, Typography, CircularProgress } from "@mui/material";

const ProfileView = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const profileData = await getUserProfile(user.uid);
        setProfile(profileData);
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) return <CircularProgress />
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Profile: {profile.name}</Typography>
      <img src={profile.profilePic} alt="Profile" width="150" />
      <Typography variant="body1">Email: {profile.email}</Typography>
      <Typography variant="body1">Tech Stack: {profile.techStack.join(", ")}</Typography>
      <Typography variant="body1">Experience: {profile.experience}</Typography>
    </Box>
  );
};

export default ProfileView;
