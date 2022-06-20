import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../context/AuthContextProvider";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { StoreProvider } from "../context/StoreContext";
import "../styles/globals.css";

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
      <StoreProvider>
        <AuthContextProvider>
          {nonProtectedRoute.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </AuthContextProvider>
      </StoreProvider>
    );
  }
}

export default MyApp;
