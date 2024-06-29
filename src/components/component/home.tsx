"use client";

import { T_addAnalytics, addAnalytics } from "@/actions/analytics";
import { Contact } from "@/components/component/contact";
import Header, { SocialLinks } from "@/components/component/header";
import { Report } from "@/components/component/report";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useCallback, useState } from "react";
import { useCookies } from "react-cookie";

export default function Home({ queryObject }: { queryObject: T_addAnalytics }) {
  const [isReport, setisReport] = useState(false);
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const ref = useRef(false);

  const { mode, app, utm_source } = queryObject;
  const Analyse = useCallback(async () => {
    const AnalyticsData: T_addAnalytics = { mode, app, utm_source };
    const res = await addAnalytics(AnalyticsData);
    if (res) {
      setCookie("auth_token", "k9I6ZjB9s41-tL7I/AC7Gup5kQIBanmmap");
    }
  }, [setCookie, mode, app, utm_source]);

  useEffect(() => {
    if (!cookies.auth_token && !ref.current) {
      ref.current = true;
      Analyse();
    }
    if (mode == "report") {
      setisReport(true);
    }
  }, [mode, cookies.auth_token, Analyse]);

  return (
    <div
      className="  h-screen
    sm:bg-gradient-to-r sm:from-rose-100 sm:to-blue-100
    dark:bg-gradient-to-r dark:from-slate-950 dark:to-gray-950
    bg-gradient-to-r from-rose-50 to-blue-50
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
