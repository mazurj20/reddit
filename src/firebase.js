import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDOHI9ylfuIMiVw7VNnnU_xtdaHiptRYVA",
  authDomain: "reddit-45774.firebaseapp.com",
  databaseURL: "https://reddit-45774.firebaseio.com",
  projectId: "reddit-45774",
  storageBucket: "reddit-45774.appspot.com",
  messagingSenderId: "365102441066",
  appId: "1:365102441066:web:db44659fe8015e4c512013",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
