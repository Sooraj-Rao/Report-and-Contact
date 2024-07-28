import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./toggle-theme";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MyData } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const Header = () => {
  return (
    <div className=" w-full flex justify-between  items-center sm:px-20 px-3   py-4 ">
      <a
        href={MyData.site}
        target="_blank"
        className=" flex flex-col  cursor-default"
      >
        <span className=" sm:text-xl text-lg font-semibold">{MyData.name}</span>
        <span className="  text-xs">{MyData.about}</span>
      </a>
      <ModeToggle />
    </div>
  );
};

export default Header;
