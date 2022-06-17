import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiSearch, HiBell, HiChevronDown, HiPencil } from "react-icons/hi";

import { useState, useEffect, Fragment } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import DropdownMenu from "../DropdownMenu";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [url, setUrl] = useState("/");
  const router = useRouter();
  console.log("router :>> ", router);

  useEffect(() => {
    setUrl(router.route);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { signout } = useAuth();

  return (
    <nav
      className={`px-5 z-50	fixed top-0 left-0 right-0 ${
        isScrolled && "bg-[#141414]"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-8 ">
          <div>
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={100}
              height={60}
            />
          </div>
          <DropdownMenu />

          <div className="hidden md:inline-block space-x-5">
            <Link href="/">
              <a className={url === "/" ? "navLink-active" : "navLink"}>Home</a>
            </Link>
            <Link href="/movies">
              <a className={url === "/movies" ? "navLink-active" : "navLink"}>
                Movies
              </a>
            </Link>
            <Link href="tv-shows">
              <a className={url === "/tv-shows" ? "navLink-active" : "navLink"}>
                TV Shows
              </a>
            </Link>
            <Link href="/new-popular">
              <a
                className={
                  url === "/new-popular" ? "navLink-active" : "navLink"
                }
              >
                New & popular
              </a>
            </Link>
            <Link href="/mylist">
              <a className={url === "/mylist" ? "navLink-active" : "navLink"}>
                My List
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <HiSearch className="hidden md:inline-block navLink h-6 w-6" />
          <Link href="/kids">
            <a className="hidden navLink lg:inline-block">Kids</a>
          </Link>
          <HiBell className="navLink h-6 w-6" />
          <Link href="/account">
            <a href="">
              <Image
                src="/images/others/account.png"
                width={25}
                height={25}
                alt="account-logo"
                className="rounded "
                onClick={signout}
              />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
