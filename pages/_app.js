import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../context/AuthContextProvider";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { StoreProvider } from "../context/StoreContext";
import "../styles/globals.css";

const nonProtectedRoute = ["/signin", "/signup"];

function MyApp({ Component, pageProps }) {
  // const { modalMode } = state;
  // useEffect(() => {
  //   if (modalMode) {
  //     document.body.style.overflow = "hidden";
  //     return () => (document.body.style.overflow = "unset");
  //   }
  // }, []);

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
