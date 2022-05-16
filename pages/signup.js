import { useEffect, useState } from "react";
import Large from "../components/Large";
import Small from "../components/Small";
import { useAuth } from "../context/AuthContextProvider";

const SignUpPage = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    console.log(width);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  const { signup, error } = useAuth();

  const onSubmit = async (data) => {
    //   console.log(data)

    await signup(data.email, data.password);
  };

  //   console.log("USER=======", user);

  const smallScreenSize = 640;

  return (
    <>
      {width < smallScreenSize ? (
        <Small
          page="Sign Up"
          onSubmit={onSubmit}
          goTo="/signin"
          firebaseErr={error}
        />
      ) : (
        <Large
          page="Sign Up"
          onSubmit={onSubmit}
          goTo="/signin"
          firebaseErr={error}
        />
      )}
    </>
  );
};

export default SignUpPage;
