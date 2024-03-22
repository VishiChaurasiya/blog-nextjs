import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

const list = [
  "Change Plan Anytime",
  "Trail Begins Anytime",
  "No CC Required",
  "Cancel Anytime",
];

const CTA = () => {
  return (
    <div
      className="lg:h-[400px] px-[15px] lg:px-[92px] py-[40px] flex-center flex-col gap-[20px]"
      style={{
        backgroundImage: `url("https://dyolkjkaata8s.cloudfront.net/images/cta_bg_image.png")`,
      }}
    >
      <h1 className="text-[25px] lg:text-[40px] font-semibold text-center">
        Manage Social Media Effortlessly
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-7 lg:gap-10">
        {list.map((item, index) => (
          <div key={index} className="flex-center gap-2 text-xl">
            <FaCheck size={20} className="" />
            {item}
          </div>
        ))}
      </div>
      <Link
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/onboarding/signup`}
        className="flex-center w-[300px] h-[62px] bg-black rounded-[10px] text-xl font-semibold text-white mt-[40px]"
      >
        Try it for free
      </Link>
    </div>
  );
};

export default CTA;
