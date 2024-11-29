import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth"; 
import { getUserProfile } from "../../firebase/firebaseHelper";
const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      };
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div>
      {userProfile ? (
        <>
          <h1>{userProfile.name}</h1>
          <img src={userProfile.profilePic} alt="Profile" />
          <p>Email: {userProfile.email}</p>
          <p>Experience: {userProfile.experience}</p>
          <p>Tech Stack: {userProfile.techStack.join(", ")}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
