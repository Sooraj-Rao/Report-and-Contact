"use server";
import {
  EmailTemplate,
  EmailTemplateProps,
} from "@/components/component/email-template";
import { Resend } from "resend";

interface SendMailResponse {
  error: boolean;
}

export const SendMail = async (
  props: EmailTemplateProps
): Promise<SendMailResponse> => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_SEND_API);
    const { error } = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_SEND_FROM!,
      to: [process.env.NEXT_PUBLIC_SEND_TO!],
      subject: `${props?.name} sent a Contact-Form`,
      react: EmailTemplate(props),
    });

    if (error) {
      return { error: true };
    } else {
      return { error: false };
    }
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
