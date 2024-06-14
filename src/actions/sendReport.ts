"use server";
import {
  EmailTemplate,
  EmailTemplateProps,
} from "@/components/component/email-template";
import { Resend } from "resend";

interface SendReportResponse {
  error: boolean | string;
  data?: any | null;
}

export const SendReport = async (
  props: EmailTemplateProps
): Promise<SendReportResponse> => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_SENDREPORT_API);
    const name = props?.email?.match(/^[^@]+/)![0].replace(/\d+/g, "");
    props.name = name;

    const { data, error } = await resend.emails.send({
      from: "Report-Issue@resend.dev",
      to: ["soorajrao630@gmail.com"],
      subject: `${name} has Reported Issue`,
      react: EmailTemplate(props),
    });
    if (error) {
      return { error: "Send failed", data: null };
    } else {
      return { error: false, data };
    }
  } catch (error) {
    console.log(error);
    return { error: "Unexpected error occurred", data: null };
  }
};
