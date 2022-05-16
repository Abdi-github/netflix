import { useEffect, useState } from "react";
import Large from "../components/Large";
import Small from "../components/Small";
import { useAuth } from "../context/AuthContextProvider";

const SignInPage = () => {
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

  const { signin, error } = useAuth();
  error && console.log(error);

  const onSubmit = async (data) => {
    //   console.log(data)

    await signin(data.email, data.password);
  };

  const smallScreenSize = 640;

  return (
    <>
      {width < smallScreenSize ? (
        <Small
          page="Sign In"
          onSubmit={onSubmit}
          goTo="/signup"
          firebaseErr={error}
        />
      ) : (
        <Large
          page="Sign In"
          onSubmit={onSubmit}
          goTo="/signup"
          firebaseErr={error}
        />
      )}
    </>
  );
};

export default SignInPage;
