import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import useSubscription from "./useSubscription";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  const subs = useSubscription();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
    if (user && subs?.status !== "active") {
      router.push("/signup/plans");
    }
  }, [user, router, subs?.status]);

  return <>{subs?.status === "active" ? children : null}</>;
};

export default ProtectedRoute;
