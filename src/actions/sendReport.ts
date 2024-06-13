"use server";
import {
  EmailTemplate,
  EmailTemplateProps,
} from "@/components/component/email-template";
import { Resend } from "resend";

interface SendReportProps {
  downloadURL: string;
  Inputdata: EmailTemplateProps;
}

interface SendReportResponse {
  error: boolean | string;
  data: any | null;
}

export const SendReport = async ({
  downloadURL,
  Inputdata,
}: SendReportProps): Promise<SendReportResponse> => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_SENDREPORT_API);

    const name = Inputdata.email.match(/^[^@]+/)![0].replace(/\d+/g, "");
    if (downloadURL) Inputdata.url = downloadURL;
    Inputdata.name = name;

    const { data, error } = await resend.emails.send({
      from: "Report-Issue@resend.dev",
      to: ["soorajrao630@gmail.com"],
      subject: `${name} has Reported Issue`,
      react: EmailTemplate(Inputdata),
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
