import React from "react";
import { User as FirebaseUser } from "firebase/auth";

export const AuthContext = React.createContext<FirebaseUser | null>(null);
