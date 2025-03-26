import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// WARNING: Run this script only once to create your initial admin user
// You can run this in a development environment or as a one-time script

async function createInitialAdmin() {
  // SET THESE VALUES BEFORE RUNNING
  const adminEmail = "oculusquest2119@gmail.com";
  const adminPassword = "123456789"; // Use a strong password
  
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    const adminUid = userCredential.user.uid;
    
    // Add user to admins collection in Firestore
    await setDoc(doc(db, 'admins', adminUid), {
      email: adminEmail,
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    
    console.log("Admin user created successfully!");
    console.log("User ID:", adminUid);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Uncomment and run this function once
// createInitialAdmin();

// This function creates an admin entry for an existing auth user
async function createAdminEntry() {
  // Your existing admin user from Authentication
  const adminUid = "m0iDPavqpwRAuGaSWnZgxchUcxm1"; // Replace with the UID from Firebase Auth
  const adminEmail = "oculusquest2119@gmail.com";
  
  try {
    // Add user to admins collection in Firestore
    await setDoc(doc(db, 'admins', adminUid), {
      email: adminEmail,
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    
    console.log("Admin user created successfully!");
    console.log("User ID:", adminUid);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Run this function once
createAdminEntry();