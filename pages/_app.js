import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContextProvider, useAuth } from "../context/AuthContextProvider";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { StoreContext, StoreProvider } from "../context/StoreContext";
import "../styles/globals.css";
import { collection, getDocs, query } from "firebase/firestore";

const nonProtectedRoute = ["/signin", "/signup", "/signup/plans"];

function MyApp({ Component, pageProps }) {
  // Route Protection
  const router = useRouter();

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
    // localStorage.clear();
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <AuthContextProvider>
        <StoreProvider>
          {nonProtectedRoute.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </StoreProvider>
      </AuthContextProvider>
    );
  }
}

export default MyApp;
