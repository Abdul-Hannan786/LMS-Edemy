import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Product",
    links: [
      {
        title: "Overview",
        href: "#",
      },
      {
        title: "Features",
        href: "#",
      },

      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Pricing",
        href: "#",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Newsletter",
        href: "#",
      },

      {
        title: "Help centre",
        href: "#",
      },

      {
        title: "Support",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="h-auto flex flex-col text-start bg-gray-900 w-full text-white px-4 lg:px-20">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0">
            <div className="col-span-full xl:col-span-2">
              {/* Logo */}
              <img src={assets.logo_dark} alt="" loading="lazy" />
              <p className="mt-4 text-white">
                We design digital learning experiences that spark curiosity,
                empower students, and bring more joy and opportunity into the
                world through the power of education.
              </p>
            </div>
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-semibold">{title}</h6>
                <ul className="mt-6 space-y-2">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link href={href}>{title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Subscribe Newsletter */}
            <div className="col-span-2">
              <h6 className="font-semibold">Subscribe to our newsletter</h6>
              <p className="text-sm text-white mt-3">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form className="flex items-center gap-2 pt-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
                />
                <Button className="bg-blue-600 w-24 h-9 text-white rounded hover:bg-blue-600/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Edemy
              </Link>
              . All rights reserved.
            </span>
            <div className="flex items-center gap-5">
              <Link to={"#"} target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link to={"#"} target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link to={"#"} target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link to={"#"} target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
