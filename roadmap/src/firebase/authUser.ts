import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from ".";

const provider = new GoogleAuthProvider();
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
export const googleSignInUser=()=>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

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
