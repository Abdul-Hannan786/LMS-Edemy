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

const footerLinks = [
  {
    title: "Overview",
    href: "#",
  },
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

const Footer = () => {
  return (
    <div className="h-auto flex flex-col bg-gray-900 text-white">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="pt-12 pb-6 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
            <div>
              {/* Logo */}
              <img src={assets.logo_dark} alt="" loading="lazy" />
              <ul className="mt-6 flex items-center gap-4 flex-wrap">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link to={href}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Subscribe Newsletter */}
            <div className="max-w-xs w-full">
              <h6 className="font-semibold">Stay up to date</h6>
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
              <Link to="/" target="_blank">
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
