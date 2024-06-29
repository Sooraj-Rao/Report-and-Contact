"use server";

import { analyticsRef } from "@/lib/firebase";
import { addDoc } from "firebase/firestore";

export type T_addAnalytics = {
  app: string | null;
  mode: string | null;
  utm_source: string | null;
};

export const addAnalytics = async (props: T_addAnalytics): Promise<boolean> => {
  try {
    await addDoc(analyticsRef, props);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
