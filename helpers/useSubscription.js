import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";

const useSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [subsStatus, setSubsStatus] = useState(null);

  const userId = auth?.currentUser?.uid;

  const getSubscriptionDetail = async () => {
    // console.log(userId);

    const querySnapshot = await getDocs(
      query(collection(db, `customers/${userId}/subscriptions`))
    );
    querySnapshot.forEach((queryDocumentSnapshot) => {
      console.log(queryDocumentSnapshot.id, queryDocumentSnapshot.data());
      // setSubscription(queryDocumentSnapshot.data());
      const subs = queryDocumentSnapshot.data();
      setSubscription(subs);
      setSubsStatus(subs?.status);
    });
    // console.log(auth.currentUser.uid);
  };

  useEffect(() => {
    if (!userId) return;

    getSubscriptionDetail();

    // getSubscriptionDetail(userId);
  }, [userId, subsStatus]);
  const subscriptionData = {
    status: subsStatus,
    data: subscription,
  };
  return subscriptionData;
};

export default useSubscription;
