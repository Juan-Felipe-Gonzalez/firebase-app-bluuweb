import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

// id (database) has to be unique
export const useDatabaseStore = defineStore("database", {
  state: () => {
    return {
      documents: [],
      loadingDoc: false,
      loadingDocs: false,
    };
  },
  actions: {
    async getUrls() {
      if (this.documents.length !== 0) return;

      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid),
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUrl(name) {
      this.loadingDocs = true;
      try {
        const objectDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "urls"), objectDoc);

        this.documents.push({
          ...objectDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.error(error);
        return error.code;
      } finally {
        this.loadingDocs = false;
      }
    },
    async deleteUrl(id) {
      this.loadingDocs = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("The doc doesnt exist");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("Unauthorized");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.error(error);
        return error.message;
      } finally {
        this.loadingDocs = false;
      }
    },
    async getURL(id) {
      try {
        this.loadingDoc = true;
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("The doc doesnt exist");
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("Unauthorized");
        }

        return docSnap.data().name;
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateURL(id, name) {
      try {
        this.loadingDoc = true;
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) throw new Error("The doc doesn't exist");
        if (docSnap.data().user !== auth.currentUser.uid)
          throw new Error("Unauthorized");

        await updateDoc(docRef, {
          name: name,
        });

        this.documents = this.documents.map((doc) =>
          doc.id === id ? { ...doc, name: name } : doc,
        );

        router.push("/");
      } catch (error) {
        console.error(error);
        return error.message;
      } finally {
        this.loadingDoc = false;
      }
    },
  },
});
