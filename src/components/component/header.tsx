import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./toggle-theme";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MyData } from "@/lib/data";

const Header = () => {
  return (
    <div className=" w-full flex justify-between items-center sm:px-20 px-3   py-4 ">
      <a href={MyData.site} target="_blank" className=" flex flex-col  cursor-default">
        <span className=" text-xl font-semibold">{MyData.name}</span>
        <span className=" text-xs">{MyData.about}</span>
      </a>
      <div className=" flex justify-between  gap-x-2">
        <a target="_blank" href={MyData.github}>
          <Button title="Github" variant="ghost" className="  px-3">
            <FaGithub size={20} />
          </Button>
        </a>
        <a target="_blank" href={MyData.linkedin}>
          <Button title="Linkedin" variant="ghost" className=" px-3">
            <FaLinkedin size={20} />
          </Button>
        </a>
        <a target="_blank" href={MyData.site}>
          <Button title="Portfolio" variant="ghost" className="  px-3">
            <CgProfile size={20} />
          </Button>
        </a>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
