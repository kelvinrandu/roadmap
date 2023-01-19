import { auth, signInWithEmailAndPassword,onAuthStateChanged } from ".";

export const emailSignInUser = (user: { email: string; password: string }) =>
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });

export const emailSignOut = () => auth.signOut();

export const emailCheckAuth = (callback: any) =>{
  onAuthStateChanged(auth, (callback) => {
    // Check for user status
  });
}

// export const reauthenticateUser = (currentPassword) => {
//   const user = firebase.auth().currentUser;
//   const cred = firebase.auth.EmailAuthProvider.credential(
//     user.email,
//     currentPassword
//   );
//   return user.reauthenticateWithCredential(cred);
// };
