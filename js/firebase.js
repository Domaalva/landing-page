import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child, val } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const saveVote = async (productID) => {
  const votesRef = ref(database, "votes");
  const voteRef = push(votesRef);

  try {
    await set(voteRef, {
      productID,
      date: new Date().toISOString()
    });

    return {
      status: "success",
      message: "Vote saved successfully"
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Error saving vote"
    };
  }
};

export const getVotes = async () => {
  const votesRef = ref(database, "votes");

  try {
    const snapshot = await get(votesRef);

    if (snapshot.exists()) {
      return {
        status: "success",
        data: val(snapshot)
      };
    }

    return {
      status: "error",
      message: "No hay datos disponibles"
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Error loading votes"
    };
  }
};