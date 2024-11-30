
import { auth, db, provider } from './firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

export const loginWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Login Success:", result.user);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User Logged Out");
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw new Error(error.message);
  }
};

export const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user); 
  });
};


export const addUserToFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        techStack: [], 
        experience: "Beginner", 
      });
      console.log("User added to Firestore");
    }
  } catch (error) {
    console.error("Firestore Add User Error:", error.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User profile not found");
    }

    return userDoc.data();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; 
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, profileData);
    console.log("User profile updated");
  } catch (error) {
    console.error("Firestore Update User Error:", error.message);
    throw new Error(error.message);
  }
};


export const addProject = async (projectData) => {
  try {
    const projectsRef = collection(db, "projects");
    const newDocRef = await setDoc(doc(projectsRef), projectData);
    console.log("Project Added:", newDocRef.id);
  } catch (error) {
    console.error("Add Project Error:", error.message);
    throw new Error(error.message);
  }
};

export const getAllProjects = async () => {
  try {
    const projectsRef = collection(db, "projects");
    const querySnapshot = await getDocs(projectsRef);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (error) {
    console.error("Fetch Projects Error:", error.message);
    throw new Error(error.message);
  }
};

export const getProjectDetails = async (projectId) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectDoc = await getDoc(projectRef);

    if (projectDoc.exists()) {
      return projectDoc.data();
    } else {
      console.log("Project not found!");
      return null;
    }
  } catch (error) {
    console.error("Get Project Error:", error.message);
    throw new Error(error.message);
  }
};


export const updateProjectTasks = async (projectId, taskData) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, { tasks: taskData });
    console.log("Project tasks updated");
  } catch (error) {
    console.error("Update Project Tasks Error:", error.message);
    throw new Error(error.message);
  }
};

export const getProjectTasks = async (projectId) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectDoc = await getDoc(projectRef);

    if (projectDoc.exists()) {
      const data = projectDoc.data();
      return data.tasks || []; 
    } else {
      console.log("Project not found!");
      return [];
    }
  } catch (error) {
    console.error("Fetch Project Tasks Error:", error.message);
    throw new Error(error.message);
  }
};


export const addNotification = async (userId, message) => {
  try {
    const notificationsRef = collection(db, "notifications");
    await setDoc(doc(notificationsRef), {
      userId,
      message,
      read: false,
      timestamp: Date.now(),
    });
    console.log("Notification added");
  } catch (error) {
    console.error("Add Notification Error:", error.message);
    throw new Error(error.message);
  }
};

export const getNotifications = async (userId) => {
  try {
    const notificationsRef = collection(db, "notifications");
    const querySnapshot = await getDocs(notificationsRef);
    const notifications = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        notifications.push({ id: doc.id, ...doc.data() });
      }
    });
    return notifications;
  } catch (error) {
    console.error("Fetch Notifications Error:", error.message);
    throw new Error(error.message);
  }
};