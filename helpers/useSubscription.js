import { useEffect, useState, useContext } from "react";

import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { StoreContext } from "../context/StoreContext";

const useSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const { dispatch } = useContext(StoreContext);

  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    (async function () {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, `customers/${userId}/subscriptions`))
        );
        let subs = null;

        querySnapshot.forEach((queryDocumentSnapshot) => {
          console.log(queryDocumentSnapshot.id, queryDocumentSnapshot.data());
          subs = queryDocumentSnapshot.data();

          // setSubscription(queryDocumentSnapshot.data());
        });
        console.log("SSSSSSSSSSSSSS", subs);
        if (subs === null) {
          localStorage.setItem("subscription", null);
          dispatch({
            type: "SET_SUBSCRIPTION",
            payload: {
              subscription: null,
            },
          });
        } else {
          localStorage.setItem("subscription", JSON.stringify(subs));

          dispatch({
            type: "SET_SUBSCRIPTION",
            payload: {
              subscription: subs,
            },
          });
        }

        // setSubscription(subs);
        // setSubsStatus(subs?.status);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userId, subscription?.status]);

  return subscription;
};

export default useSubscription;
