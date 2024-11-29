import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; 

export const addUserToFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid); 
  try {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      techStack: [],
      experience: "Beginner", 
    });
  } catch (error) {
    console.error("Error adding user to Firestore:", error)
  }
}

export const getUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId)
  try {
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      return userDoc.data()
    } else {
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
  }
}

export const getProjects = async () => {
  const projectsRef = collection(db, "projects")
  try {
    const querySnapshot = await getDocs(projectsRef)
    const projects = []
    querySnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), id: doc.id })
    })
    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
  }
};
