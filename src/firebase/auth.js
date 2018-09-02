import fire from '../fire'

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  fire.auth().createUserWithEmailAndPassword(email, password);

  // Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  fire.auth().signInWithEmailAndPassword(email, password);


// Sign out
export const doSignOut = () =>
  fire.auth().signOut();

// Password Reset
export const doPasswordReset = (email) =>
  fire.auth().sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  fire.auth().currentUser.updatePassword(password);