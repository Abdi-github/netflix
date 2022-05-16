import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContextProvider";
import { validEmail } from "../helpers/global-constants";

const Small = ({ page, onSubmit, goTo, firebaseErr }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { error } = useAuth;
  console.log("first", error);

  return (
    <div className="h-screen">
      <div className="pt-2 -ml-2">
        <Image
          src="/images/logo/logo.svg"
          width={120}
          height={35}
          alt="netflix bg"
        />
      </div>

      <div className="max-w-[400px] mx-auto pt-12 px-10  ">
        <form className="self-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold tracking-wide mb-10">{page}</h1>

          {firebaseErr == "auth/user-not-found" ? (
            <div className="bg-[#e87c03] mb-3 rounded px-2 py-2 text-sm">
              <p>
                Sorry, we can't find an account with this email address. Please
                try again or{" "}
                <span className="underline cursor-pointer">
                  <Link href="/signup">create a new account</Link>
                </span>
                .
              </p>
            </div>
          ) : firebaseErr == "auth/wrong-password" ? (
            <div className="bg-[#e87c03] mb-3 rounded px-2 py-2 text-sm">
              <p>The password you entered is not correct.</p>
            </div>
          ) : firebaseErr ? (
            <div className="bg-[#e87c03] mb-3 rounded px-2 py-2 text-sm">
              <p>{firebaseErr}</p>
            </div>
          ) : (
            ""
          )}

          <div className=" space-y-4 mb-7">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: validEmail,
                    message: "Please enter valid email",
                  },
                })}
                className="w-full px-2 py-3 rounded bg-[#e8f0fe] text-gray-800"
              />
              {errors.email ? (
                <span className="text-red-600 text-sm ">
                  {errors.email.message}
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Please enter the password",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters ",
                  },
                })}
                className="w-full px-2 py-3 rounded bg-[#e8f0fe] text-gray-800"
              />
              {errors.password ? (
                <span className="text-red-600 text-sm ">
                  {errors.password.message}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-12">
            <button
              type="submit"
              className="bg-[#e50914] w-full text-base font-semibold py-3 rounded"
            >
              Sign In
            </button>
          </div>
          <Link href={goTo}>
            <div className="cursor-pointer">
              <p className="text-gray-400 font-light inline mr-1">
                {router.route == "/signin"
                  ? "New to Netflix?"
                  : "Already have an account?"}
              </p>
              <span>
                {router.route == "/signin" ? " Sign up now" : "Sign in now"}
              </span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Small;
