"use server";
import { EmailTemplate } from "@/components/component/email-template";
import { Resend } from "resend";

export const SendMail = async (props) => {
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
  }
};
