import { BsInstagram, BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import { MdOutlineLocationOn, MdOutlineEmail, MdCall } from "react-icons/md";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="overflow-hidden">
      <div className="bg-black p-5 box-border">
        <div className="flex flex-col justify-center gap-4 lg:flex-row lg:gap-[1.5rem]">
          <div>
            <div className="-mt-[8px]">
              <Image
                className="w-[200px] lg:w-[300px] flex-shrink-0"
                width="180"
                height="63"
                src="https://dyolkjkaata8s.cloudfront.net/images/personaliz_white_logo.svg"
                alt="logo"
              />
            </div>
            <div className="flex gap-3 md:mt-[28px] mt-5 md:mb-[40px] mb-4">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/personaliz.ai"
                className="text-white"
              >
                <BsInstagram size={20} />
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/personaliz_ai"
                className="text-white"
              >
                <BsTwitter size={20} />
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/personaliz.ai.page"
                className="text-white"
              >
                <BsFacebook size={20} />
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/personaliz-ai"
                className="text-white"
              >
                <BsLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="text-white mt-4 flex-shrink-0">
            <h4 className="text-[20px] font-bold ">Usecases</h4>
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/send-personalized-political-campaigns`}
            >
              <p className="mt-4 cursor-pointer">Political Campaign</p>
            </a>
          </div>

          <div className="text-white mt-4 lg:ml-7">
            <h4 className="text-[20px] font-bold ">Platform</h4>
            <a href="https://www.interactly.video/">
              <p className="mt-4 cursor-pointer">Interactly.video</p>
            </a>
          </div>

          <div className="text-white mt-4 lg:ml-7">
            <h4 className="text-[20px] font-bold">Resources</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://personaliz.ai/blog/"
            >
              <p className="mt-4">Blogs</p>
            </a>
          </div>

          <div className="text-white mt-4 lg:ml-7">
            <h4 className="text-[20px] font-bold">Legal</h4>
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/privacy`}
            >
              <p className="mt-4">Privacy Policy</p>
            </a>
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/termsandconditions`}
            >
              <p className="mt-4">Terms and Conditions</p>
            </a>
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/contact_us`}
            >
              <p className="mt-4">Support</p>
            </a>
          </div>

          <div className="text-white  mt-4 lg:ml-7">
            <div>
              <h4 className="text-[20px] font-bold">Address</h4>
              <div className="flex">
                <p className="mt-1 mr-2">
                  <MdOutlineLocationOn />
                </p>
                <p>Interactly Solutions Private Ltd.</p>
              </div>

              <div className="flex">
                <p className="ml-6">
                  Flat 401, Ganesh Meadows, Gopal Nagar Society, Kukatpally,
                  Hyderabad, India. 500085.
                </p>
              </div>
              <div className="flex mt-4">
                <p className="mt-1 mr-2">
                  <MdOutlineEmail />
                </p>
                <p>info@personaliz.ai</p>
              </div>
              <div className="flex mt-4">
                <p className="mt-1 mr-2">
                  <MdCall />
                </p>
                <p>+91-7207982810</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white text-center md:pt-[94px] max-[900px]:mt-5 pt-3 pb-5">
          © 2023 Interactly Solutions Pvt Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
