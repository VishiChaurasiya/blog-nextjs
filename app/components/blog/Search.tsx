"use client";

import { IoIosSearch } from "react-icons/io";
import { Tag } from "@/app/actions/getTags";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";

interface SearchProps {
  name: string;
  description: string;
  tags: Tag[];
}

interface Post {
  title: string;
  slug: string;
}

interface ApiResponse {
  status: boolean;
  filteredPosts: Post[];
}

const Search: React.FC<SearchProps> = ({ name, description, tags }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue) {
      setLoading(true);

      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(() => {
        getFilteredPosts();
      }, 500);
      setTimeoutId(id);
    } else setFilteredPosts([]);

    // eslint-disable-next-line
  }, [searchValue]);

  const getFilteredPosts = async () => {
    if (searchValue)
      try {
        const response = await axios.post<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_DOMAIN_URL}/api/search`,
          { query: searchValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) setFilteredPosts(response.data.filteredPosts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
  };

  return (
    <header className="bg-[#f9f5ef] backdrop-blur-[10px] flex flex-col items-center px-[15px] py-[40px]">
      <h1 className="text-[25px] sm:text-[48px] font-semibold leading-[1]">
        {name}
      </h1>
      {description && (
        <p className="mt-[20px] text-[18px] text-center">{description}</p>
      )}
      <div className="relative mt-[48px]">
        <input
          className="w-[280px] lg:w-[574px] h-[59px] py-[10px] pl-[16px] pr-[52px] box-border rounded-[10px] border border-black/80 bg-[#ffffff0d] outline-none text-black text-lg placeholder:text-black/60"
          placeholder="Search here..."
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {loading ? (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper absolute top-1/2 -translate-y-1/2 right-4"
            colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
          />
        ) : searchValue ? (
          <RxCross2
            size={25}
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            onClick={() => {
              setSearchValue("");
              setFilteredPosts([]);
            }}
          />
        ) : (
          <IoIosSearch
            className="absolute top-1/2 -translate-y-1/2 right-4"
            size={25}
          />
        )}

        {Boolean(filteredPosts.length) && Boolean(searchValue) && (
          <div className="mt-1 max-h-[228px] w-full bg-white border border-[#D9D9D9] rounded-lg absolute overflow-y-auto">
            {filteredPosts.map(({ slug, title }, index) => (
              <Link
                href={`/blog/${slug}`}
                key={index}
                className="px-5 py-4 w-full block border-b last:border-b-0 border-[#D9D9D9] hover:bg-black/10 text-sm"
              >
                {title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-[64px] max-w-[1040px] flex flex-wrap gap-4 justify-center">
        {tags.map(({ name, slug }) => (
          <Link
            key={slug}
            href={`/blog/tag/${slug}`}
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

export default Search;
