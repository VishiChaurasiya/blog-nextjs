"use client";

import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { Tag } from "@/app/actions/getTags";

interface SearchProps {
  name: string;
  description: string;
  tags: Tag[];
}

const Header: React.FC<SearchProps> = ({ name, description, tags }) => {
  return (
    <header className="bg-[#f9f5ef] backdrop-blur-[10px] flex flex-col items-center px-[15px] py-[40px] mt-[75px]">
      <h1 className="text-[32px] lg:text-[48px] font-semibold leading-[1] mb-[20px]">
        {name}
      </h1>
      <p className="mb-[8px] lg:mb-0 text-[18px] text-center">{description}</p>
      <div className="relative mt-[48px]">
        <input
          className="w-[280px] lg:w-[474px] h-[59px] px-[16px] py-[10px] box-border rounded-[10px] border border-black/80 bg-[#ffffff0d] outline-none text-black text-lg placeholder:text-black/60"
          placeholder="Search here..."
          type="text"
        />
        <IoIosSearch
          className="absolute top-1/2 -translate-y-1/2 right-3"
          size={23}
        />
      </div>
      <div className="mt-[64px] max-w-[1040px] flex flex-wrap gap-4 justify-center">
        {tags.map(({ name, slug }) => (
          <Link
            key={slug}
            href={`blog/tag/${slug}`}
            className="px-[20px] py-[8px] rounded-[8px] border border-black text-sm"
            style={{
              background:
                "linear-gradient(91deg, rgba(0, 0, 0, 0.05) 0.17%, rgba(101, 44, 179, 0.05) 80.77%)",
            }}
          >
            {name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
