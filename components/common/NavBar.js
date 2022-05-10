import Image from "next/image";
import Link from "next/link";
import { BeakerIcon, BellIcon, SearchIcon } from "@heroicons/react/solid";
import { useState,useEffect } from "react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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

  return (
    <nav className="px-5 z-50	fixed top-0 left-0 right-0">
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
          <div className="hidden md:inline-block space-x-5">
            <Link href="">
              <a className="navLink">home </a>
            </Link>
            <Link href="">
              <a className="navLink">movies </a>
            </Link>
            <Link href="">
              <a className="navLink">TV shows </a>
            </Link>
            <Link href="">
              <a className="navLink">new & popular </a>
            </Link>
            <Link href="">
              <a className="navLink">my list </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <SearchIcon className="hidden md:inline-block navLink h-6 w-6" />
          <Link href="/">
            <a className="hidden navLink lg:inline-block">Kids</a>
          </Link>
          <BellIcon className="navLink h-6 w-6" />
          <Link href="/">
            <a href="">
              <Image
                src="/images/others/account.png"
                width={25}
                height={25}
                alt="account-logo"
                className="rounded "
              />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
