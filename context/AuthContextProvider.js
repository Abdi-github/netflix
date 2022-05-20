import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { async } from "@firebase/util";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseErr, setFirebaseErr] = useState(null);
  const router = useRouter();
  //   console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        setUser(userInfo.user);
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        console.log("SIGNUP ERROR------------", err.code);

        setFirebaseErr(err.code);
        setLoading(false);
      });
  };

  const signin = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        setUser(userInfo.user);
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        // console.log("Sign in error__________", error.message);
        console.log("Sign in error code__________", err.code);
        setFirebaseErr(err.code);
        setLoading(false);
      });
  };

  const signout = async () => {
    setUser(null);
    await signOut(auth).then(() => router.push("/signin"));
  };

  return (
    <AuthContext.Provider
      value={{ user, signin, signup, signout, firebaseErr }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
