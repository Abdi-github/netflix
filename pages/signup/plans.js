import { getProducts } from "@stripe/firestore-stripe-payments";
import { collection, doc, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import PlanCard from "../../components/PlanCard";
import PlanTable from "../../components/PlanTable";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContextProvider";
import { StoreContext } from "../../context/StoreContext";
import app, { auth, db } from "../../firebase";
import { getAllProducts } from "../../helpers/firestore_api";
import useSubscription from "../../helpers/useSubscription";
// import useSubscription from "../../helpers/subscription";
import payments, { loadCheckout } from "../../stripe";

const plans = () => {
  const [viewWidth, setViewWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  // const sub = useSubscription();
  // console.log("SUBSCR", sub);

  const [plans, setPlans] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState(plans[2]);

  useEffect(() => {
    const handleWindowResize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // console.log(viewWidth);

    // getProducts();

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [viewWidth]);

  useEffect(() => {
    getProducts();
  }, []);

  const smallScreenSize = 768;
  // console.log(products);
  // console.log("SELECTED", selectedPlan);

  const getProducts = async () => {
    const data = await getAllProducts();
    console.log("DATADOC", data.docs);
    setPlans(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setSelectedPlan(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[2]);
  };

  // console.log("Plans", plans);
  // console.log("Selected Plan", selectedPlan);
  // console.log("products", products);

  const { signout, user } = useAuth();
  const { state } = useContext(StoreContext);
  useSubscription();
  const { subscription } = state;
  const router = useRouter();

  const [isSubscribeBtnClicked, setIsSubscribeBtnClicked] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;
    if (subscription) {
      router.push("/account");
      return;
    }
    loadCheckout(selectedPlan.prices[0].id);
    // dispatch({
    //   type: "SET_SUBSCRIBE_BTN_CLICKED",
    //   payload: { isSubscribeBtnClicked: true },
    // });
    setIsSubscribeBtnClicked(true);
  };

  return (
    <>
      <Head>
        <title>Netflix plans</title>
      </Head>
      {/* <pre>{JSON.stringify(plans, null, 4)}</pre> */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-b-gray-600">
        <div className="-ml-4">
          <Image
            src="/images/logo/logo.svg"
            width={viewWidth < smallScreenSize ? `120` : `180`}
            height={viewWidth < smallScreenSize ? `35` : `60`}
            alt="netflix bg"
          />
        </div>
        <div onClick={signout}>
          <p className="font-semibold  hover:underline hover:opacity-60 cursor-pointer ">
            Sign Out
          </p>
        </div>
      </div>
      <div className="px-4 space-y-8 py-8 md:px-24 lg:px-36 md:space-y-22">
        <h1 className="text-3xl font-semibold ">
          Choose the plan that&apos;s right for you
        </h1>

        <div className="flex w-full justify-center gap-2  cursor-pointer capitalize text-lg md:text-2xl font-semibold  md:justify-end">
          {plans.map((plan) => {
            return (
              <div key={plan.id} className="w-1/3 md:w-[calc(60%/3)] ">
                <PlanCard
                  plan={plan}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                />
              </div>
            );
          })}
          {/* <div className="h-24 w-32 bg-red-500"></div>
          <div className="h-24 w-32 bg-red-500"></div> */}
        </div>
        <div>
          <PlanTable
            plans={plans}
            selectedPlan={selectedPlan}
            smallScreenSize={smallScreenSize}
            viewWidth={viewWidth}
          />
        </div>
        <div className="text-gray-400 space-y-4 font-light text-sm">
          <p>
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
            subject to your internet service and device capabilities. Not all
            content is available in all resolutions.
          </p>
          <p>
            Only people who live with you may use your account. Watch on 4
            different devices at the same time with Premium, 2 with Standard and
            1 with Basic.
          </p>
        </div>
        <div className="w-full py-5 text-center bg-red-600 rounded text-white text-2xl font-bold md:w-1/2 md:mx-auto hover:bg-red-800">
          <button
            type="submit"
            onClick={subscribeToPlan}
            disabled={isSubscribeBtnClicked ? true : false}
          >
            {isSubscribeBtnClicked ? (
              <Spinner color="text-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
        <div className="py-72 w-full"></div>
      </div>
    </>
  );
};

export default plans;
