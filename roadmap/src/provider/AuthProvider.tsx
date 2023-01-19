import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import { User as FirebaseUser } from "firebase/auth";
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../firebase";

type Props = {
  children: React.ReactNode; //👈 children prop typr
};
export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
       setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
