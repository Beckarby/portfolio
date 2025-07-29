import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in existing users
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Listen for auth state changes
const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { signUp, signIn, logout, onAuthStateChange };