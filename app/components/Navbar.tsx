"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar: React.FC<{}> = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(true);

  const handleNav: () => void = () => {
    setNav(!nav);
  };

  const changeBgAndLogo: () => void = () => {
    if (window.scrollY >= 64) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBgAndLogo();
    window.addEventListener("scroll", changeBgAndLogo);
  }, []);

  return (
    <nav
      className={
        true
          ? "py-2 shadow-md fixed w-full bg-white top-0 z-40 medium"
          : `py-2  w-full top-0 z-40 medium fixed`
      }
    >
      <div className="flex justify-between lg:w-full mx-auto px-3 md:px-9 lg:px-14">
        <a
          target="_blank"
          href={process.env.NEXT_PUBLIC_DOMAIN_URL}
          className="flex items-center cursor-pointer text-[22px] font-bold"
        >
          <Image
            width="50"
            height="56"
            src="https://personaliz.s3.ap-south-1.amazonaws.com/Personaliz+Logos/Personaliz+Black+Logo.png"
            alt="personaliz_logo"
            className="mr-3"
          />
          Personaliz.ai
        </a>

        {/* Medium Screen */}
        <div className="flex gap-8">
          <a
            target="_blank"
            className="pt-1 cursor-pointer text-lg md:flex items-center hidden"
            href={process.env.NEXT_PUBLIC_DOMAIN_URL}
          >
            Use Cases
          </a>

          <a
            target="_blank"
            className="pt-1 cursor-pointer text-lg md:flex items-center hidden"
            href={process.env.NEXT_PUBLIC_DOMAIN_URL}
          >
            How It Works
          </a>

          <a
            target="_blank"
            className="pt-1 cursor-pointer text-lg md:flex items-center hidden"
            href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/pricing`}
          >
            Pricing
          </a>
        </div>
        <div className="md:flex gap-8 items-center hidden">
          <a
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/onboarding/signup`}
            className="w-[180px] h-[42px] flex justify-center items-center hover:bg-white hover:text-black hover:border border-black bg-black rounded-[8px] text-white text-lg font-medium transition-all duration-500"
          >
            Try For Free
          </a>

          <a
            target="_blank"
            href={process.env.NEXT_PUBLIC_APP_DOMAIN_URL}
            className="w-[49px] h-[27px] text-lg underline underline-offset-4"
          >
            Login
          </a>
        </div>

        {/* Small Screen */}
        <div onClick={handleNav} className="block md:hidden mt-3 md:pr-5 pr-2">
          {!nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={30} />}
        </div>
        <div
          className={
            !nav
              ? "fixed md:hidden bg-white z-10 left-0 top-[65px] h-full w-[100%]  ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <div className="flex flex-col text-black text-center ">
            <a
              target="_blank"
              className="pt-4 cursor-pointer"
              href={process.env.NEXT_PUBLIC_DOMAIN_URL}
            >
              Use Cases
            </a>
            <a
              target="_blank"
              className="p-4 cursor-pointer"
              href={process.env.NEXT_PUBLIC_DOMAIN_URL}
            >
              How It Works
            </a>
            <a
              target="_blank"
              className="pb-4 cursor-pointer"
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/pricing`}
            >
              Pricing
            </a>
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/onboarding/signup`}
              className="mx-auto w-[180px] h-[42px] flex justify-center items-center hover:bg-white hover:text-black hover:border border-black bg-black rounded-[8px] text-white text-lg font-medium transition-all duration-500"
            >
              Try For Free
            </a>
            <a
              target="_blank"
              href={process.env.NEXT_PUBLIC_APP_DOMAIN_URL}
              className="w-full h-[27px] text-lg underline underline-offset-4 mt-5"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
