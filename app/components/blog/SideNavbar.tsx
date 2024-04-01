"use client";

import { useRef } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

interface headingListProps {
  element: string;
  text: string;
}

interface SideNavbarProps {
  headingList: headingListProps[];
}

const SideNavbar: React.FC<SideNavbarProps> = ({ headingList }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="hidden lg:block flex-shrink-0 h-[calc(100vh-130px)] sticky top-[100px] rounded-[10px] bg-black/5 mt-5 w-[315px]">
      <div
        onClick={() =>
          scrollContainerRef.current?.scrollBy({ top: -50, behavior: "smooth" })
        }
        className="h-[35px] flex-center border-b border-black/30 mx-2 cursor-pointer"
      >
        <MdKeyboardArrowUp size={25} className="text-black/50" />
      </div>

      <div
        className="py-4 h-[calc(100%-70px)] overflow-y-auto"
        ref={scrollContainerRef}
      >
        {headingList.map(({ element, text }, index) => (
          <p
            key={index}
            className={`px-[24px] p-2 hover:bg-black/20 hover:border-l-[4px] border-black cursor-pointer ${
              element == "h3" && "pl-[40px]"
            }`}
            onClick={() => {
              const heading = document.getElementById(
                `personaliz-blog-${element}-${index + 1}`
              );

              if (heading)
                window.scrollTo({
                  top: heading.offsetTop - 100,
                  behavior: "smooth",
                });
            }}
          >
            {text}
          </p>
        ))}
      </div>

      <div
        onClick={() =>
          scrollContainerRef.current?.scrollBy({ top: 50, behavior: "smooth" })
        }
        className="absolute w-[calc(100%-16px)] bottom-0 h-[35px] flex-center border-t border-black/30 mx-2 cursor-pointer"
      >
        <MdKeyboardArrowDown size={25} className="text-black/50" />
      </div>
    </nav>
  );
};

export default SideNavbar;
