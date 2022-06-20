import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { StoreContext } from "../context/StoreContext";
import useSubscription from "./useSubscription";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { state } = useContext(StoreContext);
  const [subsStatus, setSubsStatus] = useState("");

  useSubscription();

  const { subscription } = state;
  console.log("subscription================", subscription);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
    console.log("subscription :>> ", subscription);

    if (subscription === null || subscription?.status !== "active") {
      setSubsStatus("inactive");
      router.replace("/signup/plans");
    } else {
      setSubsStatus(subscription.status);
    }

    console.log("subsStatus :>> ", subsStatus);
  }, [user, router, subscription, subsStatus]);

  return <>{subsStatus === "active" ? children : null}</>;
};

export default ProtectedRoute;
