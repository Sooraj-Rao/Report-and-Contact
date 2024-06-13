"use client";

import { Contact } from "@/components/component/Contact";
import Header from "@/components/component/Header";
import { Report } from "@/components/component/Report";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isReport, setisReport] = useState(false);

  return (
    <div
      className="  h-screen
    bg-gradient-to-r from-rose-100 to-teal-50
    dark:bg-gradient-to-r dark:from-gray-900 dark:to-zinc-950
    "
    >
      <Header />
      <div className=" flex justify-center gap-x-10 my-5">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setisReport(false)}
            className={`px-4 py-2 rounded-md transition-color
            ${
              !isReport
                ? "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
                : "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80"
            }`}
          >
            Get in Touch
          </Button>
          <Button
            onClick={() => setisReport(true)}
            className={`px-4 py-2 rounded-md transition-colors
            ${
              isReport
                ? "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
                : "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80"
            }
            `}
          >
            Report an Issue
          </Button>
        </div>
      </div>
      <div className="w-full  flex justify-center">
        {isReport ? <Report /> : <Contact />}
      </div>
    </div>
  );
}
