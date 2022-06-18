import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContextProvider";
import {
  BASIC_PRICE_ID,
  PREMIUM_PRICE_ID,
  STANDARD_PRICE_ID,
} from "../helpers/global-constants";
import useSubscription from "../helpers/useSubscription";
import { goToBillingPortal } from "../stripe";

const account = () => {
  const [viewWidth, setViewWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  const [subscription, setSubscription] = useState(null);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [priceId, setPriceId] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const subs = useSubscription();

  useEffect(() => {
    const handleWindowResize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // console.log(viewWidth);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [viewWidth]);

  useEffect(() => {
    setSubscription(subs);
    console.log("SUBS ACCT", subscription);
    const startTime = new Date(
      subscription?.created.seconds * 1000 +
        subscription?.created.nanoseconds / 1000000
    );
    const endTime = new Date(
      subscription?.current_period_end.seconds * 1000 +
        subscription?.current_period_end.nanoseconds / 1000000
    );

    // console.log("TIME=========", startTime);
    setTimeStart(startTime);
    setTimeEnd(endTime);
    setPriceId(subscription?.items[0].plan.id);
  }, [subs]);

  const smallScreenSize = 768;

  const changeSubscription = () => {
    goToBillingPortal();
    setIsClicked(true);
  };

  const membershipDiv = (
    <div>
      <h4 className="text-gray-400 text-lg pb-2">Membership & Billing</h4>
      <div onClick={changeSubscription}>
        <button
          className={`bg-gray-700 px-2 py-3 ${
            isClicked && "w-44 flex justify-center"
          }`}
          onClick={changeSubscription}
          disabled={isClicked ? true : false}
        >
          {isClicked ? (
            <Spinner color="text-gray-200" />
          ) : (
            "Cancel or Update Membership"
          )}
        </button>
      </div>
    </div>
  );

  const { signout, user } = useAuth();

  return (
    <>
      <Head>
        <title>Netflix account</title>
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
        <div>
          <Image
            src="/images/others/account.png"
            width={25}
            height={25}
            alt="account-logo"
            className="rounded"
            onClick={signout}
          />
        </div>
      </div>
      <div className="px-6 py-6 md:py-12 max-w-5xl mx-auto">
        <div className=" flex gap-x-6">
          <h2 className="text-xl">Account</h2>
          <div className="flex gap-x-2 items-center">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-sm">
              Member since {moment(timeStart).format("MMMM YYYY")}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-x-4 items-center bg-blue-500 px-4 py-2">
          <HiOutlineInformationCircle className="text-2xl " />
          <p className="text-sm">
            Your membership will be cancelled at the end of your billing period.
          </p>
        </div>
        <div className="border-y border-gray-500 mt-4 py-4 px-2 ">
          {viewWidth <= smallScreenSize && membershipDiv}
          <div className="flex mt-4 text-sm justify-between  ">
            {viewWidth > smallScreenSize && membershipDiv}
            <div className=" space-y-4">
              <p className="font-bold">{user.email}</p>
              <p className="">Password: ********* </p>
              <p className="pt-6 ">
                Your subscription will end on{" "}
                {moment(timeEnd).format("MMMM DD  YYYY")}
              </p>
            </div>
            <div className="text-blue-500 text-xs space-y-4">
              <p>Change email</p>
              <p>Change password</p>
            </div>
          </div>
        </div>
        <div className="mt-4 border-b border-gray-500 py-4 px-2 space-y-2 md:grid md:grid-cols-2">
          <h3 className="text-gray-400 text-lg ">Plan Details</h3>
          <p className="font-bold">
            {priceId === BASIC_PRICE_ID
              ? "Basic"
              : priceId === STANDARD_PRICE_ID
              ? "Standard"
              : priceId === PREMIUM_PRICE_ID
              ? "Premium"
              : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default account;
