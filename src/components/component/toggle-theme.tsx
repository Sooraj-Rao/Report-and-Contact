"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDark = theme == "light" ? false : true;
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => (!isDark ? setTheme("dark") : setTheme("light"))}
      >
        {isDark ? <MoonStar size={20} /> : <Sun size={20} />}
      </Button>
    </div>
  );
}
