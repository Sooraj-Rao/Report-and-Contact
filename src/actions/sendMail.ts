"use server";
import {
  EmailTemplate,
  EmailTemplateProps,
} from "@/components/component/email-template";
import { Resend } from "resend";

interface SendMailResponse {
  error: boolean | string;
  data: any | null;
}

export const SendMail = async (
  props: EmailTemplateProps
): Promise<SendMailResponse> => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_SEND_API);
    const { data, error } = await resend.emails.send({
      from: "Contact-Me@resend.dev",
      to: ["soorajrao630@gmail.com"],
      subject: `${props?.name} sent a Contact-Form`,
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
