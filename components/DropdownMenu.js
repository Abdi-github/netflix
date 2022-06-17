import { HiChevronDown } from "react-icons/hi";
import { Menu } from "@headlessui/react";
import Link from "next/link";

const DropdownMenu = () => {
  return (
    <Menu as="div" className="md:hidden">
      <Menu.Button className="navLink cursor-pointer flex gap-x-1 items-center">
        Browse
        <HiChevronDown className="text-xl  " />
      </Menu.Button>
      <Menu.Items className="absolute left-0 mt-8 w-64 origin-top-left divide-y divide-gray-700  bg-black/90 border-t-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 ">
          <Link href="/">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={` flex w-full items-center rounded-md px-2 py-2 text-sm justify-center ${
                    active ? "bg-black/60 text-white " : "text-gray-400 "
                  }  `}
                >
                  {/* {<HiPencil className="mr-2 h-5 w-5" aria-hidden="true" />} */}
                  Home
                </button>
              )}
            </Menu.Item>
          </Link>
        </div>
        <div className="px-1 py-1 ">
          <Link href="tv-shows">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={` flex w-full items-center rounded-md px-2 py-2 text-sm justify-center ${
                    active ? "bg-black/60 text-white " : "text-gray-400 "
                  }  `}
                >
                  TV Shows
                </button>
              )}
            </Menu.Item>
          </Link>
        </div>
        <div className="px-1 py-1 ">
          <Link href="movies">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={` flex w-full items-center rounded-md px-2 py-2 text-sm justify-center ${
                    active ? "bg-black/60 text-white " : "text-gray-400 "
                  }  `}
                >
                  Movies
                </button>
              )}
            </Menu.Item>
          </Link>
        </div>
        <div className="px-1 py-1 ">
          <Link href="new-popular">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={` flex w-full items-center rounded-md px-2 py-2 text-sm justify-center ${
                    active ? "bg-black/60 text-white " : "text-gray-400 "
                  }  `}
                >
                  New & Popular
                </button>
              )}
            </Menu.Item>
          </Link>
        </div>
        <div className="px-1 py-1 ">
          <Link href="mylist">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={` flex w-full items-center rounded-md px-2 py-2 text-sm justify-center ${
                    active ? "bg-black/60 text-white " : "text-gray-400 "
                  }  `}
                >
                  My List
                </button>
              )}
            </Menu.Item>
          </Link>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropdownMenu;
