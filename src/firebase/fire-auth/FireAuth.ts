import firebase from "firebase/app";

const signInWithGoogle = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  return await firebase.auth().signInWithPopup(provider);
};

const signInWithGitHub = async () => {
  var provider = new firebase.auth.GithubAuthProvider();
  return await firebase.auth().signInWithPopup(provider);
};

const logOut = async () => {
  return await firebase.auth().signOut();
};

const getCurrentUser = (): firebase.User | null => {
  return firebase.auth().currentUser;
};



export { signInWithGoogle, logOut, signInWithGitHub, getCurrentUser };
