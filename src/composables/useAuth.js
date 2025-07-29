import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const user = ref(null);

const initAuth = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      resolve(firebaseUser);
    });
  });
};

export function useAuth() {
  return {
    user,
    initAuth
  };
}