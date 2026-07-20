import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./../firebaseConfig.js";
import router from "../router.js";
// import { useRouter } from "vue-router"; we can't use this option
import {useDatabaseStore} from "./database"

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      userData: null,
      loadingUser: false,
      loadingSession: false
    };
  },
  actions: {
    // modify the state
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.error("An error occurred while creating the user.", error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;

      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.error(
          "An error occurred while the user was logging in.",
          error,
        );
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      this.loadingUser = true;

      const databaseStore = useDatabaseStore()
      databaseStore.$reset()

      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.error(
          "An error occurred while closing the user session.",
          error,
        );
      } finally {
        this.loadingUser = false;
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        // onAuthStateChanged(Auth, Callback to observe changes to the user's sign-in state)
        onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid };
            } else {
              // The user is not authenticated
              this.userData = null;
              const databaseStore = useDatabaseStore()
              databaseStore.$reset()
            }
            resolve(user);
          },
          (e) => reject(e),
        );
      });
    },
  },
});
