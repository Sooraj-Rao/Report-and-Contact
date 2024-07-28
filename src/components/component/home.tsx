"use client";

import { T_addAnalytics, addAnalytics } from "@/actions/analytics";
import { Contact } from "@/components/component/contact";
import Header from "@/components/component/header";
import { Report } from "@/components/component/report";

import { useEffect, useRef, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { MyData } from "@/lib/data";

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
    
    dark:bg-gradient-to-r dark:from-slate-950 dark:to-gray-950
    bg-gradient-to-r from-rose-50 to-blue-50
    "
    >
      <Header />

      <div className="w-full  flex justify-center mt-10 ">
        {isReport ? <Report /> : <Contact />}
        {utm_source === "main" && (
          <a href={MyData.site} className="  fixed sm:bottom-8 bottom-2 left-2 sm:left-8">
            <Button className="text-xs">
              <ArrowLeft size={15} className=" mr-1" />
              Back
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
