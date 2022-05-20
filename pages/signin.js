import Image from "next/image";
import { useEffect, useState } from "react";
import Sign from "../components/Sign";

const SignInPage = () => {
  const [viewWidth, setViewWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  useEffect(() => {
    const handleWindowResize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    console.log(viewWidth);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [viewWidth]);

  const smallScreenSize = 768;

  return (
    <div className="h-screen">
      {viewWidth >= smallScreenSize && (
        <div className="absolute top-0 right-0 left-0 h-screen -z-50">
          <Image
            src="/images/others/login-bg.jpg"
            layout="fill"
            objectFit="cover"
            alt="netflix bg"
          />
        </div>
      )}

      <div className="pt-2 -ml-2">
        <Image
          src="/images/logo/logo.svg"
          width={viewWidth < smallScreenSize ? `120` : `180`}
          height={viewWidth < smallScreenSize ? `35` : `60`}
          alt="netflix bg"
        />
      </div>
      <Sign />
    </div>
  );
};

export default SignInPage;
