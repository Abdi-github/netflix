import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import useSubscription from "../helpers/useSubscription";
import { StoreContext } from "./StoreContext";
// import useSubscription from "../helpers/subscription";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseErr, setFirebaseErr] = useState(null);
  const router = useRouter();
  const [subs, setSubs] = useState(null);

  useSubscription();
  //   console.log(user);
  const { state, dispatch } = useContext(StoreContext);
  const { subscription } = state;

  useEffect(() => {
    setSubs(subscription);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
        });

        // localStorage.setItem("user", JSON.stringify(user));
        // dispatch({
        //   type: "SET_USER",
        //   payload: {
        //     user: user,
        //   },
        // });
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
        router.push("/signup/plans");
        setLoading(false);
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
        setSubs(subscription);

        router.push("/");

        setLoading(false);
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
