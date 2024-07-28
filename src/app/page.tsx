"use client";

import { T_addAnalytics } from "@/actions/analytics";
import Home from "@/components/component/home";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";

const MainPage = () => {
  const [queryObject, setQueryObject] = useState<T_addAnalytics | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const queryObj: T_addAnalytics = { app: "", mode: "", utm_source: "" };

      queryParams.forEach((value, key) => {
        (queryObj as any)[key] = value;
      });

      setQueryObject(queryObj);
    }
  }, []);

  return (
    <>
      {queryObject ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Home queryObject={queryObject} />
        </Suspense>
      ) : (
        <h1 className=" flex items-center h-96 justify-center">Loading...</h1>
      )}
    </>
  );
};

export default MainPage;
