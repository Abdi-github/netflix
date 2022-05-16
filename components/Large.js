import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContextProvider";
import { validEmail } from "../helpers/global-constants";
const Large = ({ page, onSubmit, goTo }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  //   console.log("Router", router);
  const { error } = useAuth;
  return (
    <div>
      <div className="absolute top-0 right-0 left-0 h-screen">
        <Image
          src="/images/others/login-bg.jpg"
          layout="fill"
          objectFit="cover"
          alt="netflix bg"
        />
      </div>
      <div>
        <Image
          src="/images/logo/logo.svg"
          width={180}
          height={60}
          alt="netflix bg"
        />
      </div>
      <div className="relative w-[450px] bg-black/75  mx-auto py-12 ">
        <div className=" w-[75%] mx-auto ">
          <h1 className="text-4xl font-bold mb-6">{page}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
              <div className="mb-3">
                <input
                  type="email"
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: validEmail,
                      message: "Please enter valid email",
                    },
                  })}
                  placeholder="Email"
                  className="w-full px-3 py-3 bg-[#e8f0fe] rounded text-gray-800"
                />
                {errors.email ? (
                  <span className="text-red-600 text-sm ">
                    {errors.email.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  {...register("password", {
                    required: "Please enter the password",
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters ",
                    },
                  })}
                  placeholder="Password"
                  className="w-full px-3 py-3 bg-[#e8f0fe] rounded  text-gray-800"
                />
                {errors.password ? (
                  <span className="text-red-600 text-sm ">
                    {errors.password.message}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className=" bg-[#e50914] w-full text-base font-semibold py-3 rounded mt-3 "
                >
                  Sign In
                </button>
              </div>
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
    </div>
  );
};

export default Large;
