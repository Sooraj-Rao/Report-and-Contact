"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendMail } from "@/actions/sendMail";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const contactSchema = z.object({
  name: z.string().min(5, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(20, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [loader, setLoader] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (Inputdata: ContactFormData) => {
    try {
      setLoader(true);
      const { error } = await SendMail(Inputdata);
      if (error) {
        toast({
          title: "Message Not Sent",
          description: "An error occurred. Please try again later.",
        });
        return;
      }

      toast({
        title: "Message Sent",
        description: "Thank you for reaching out!",
      });
      reset();
    } catch (error) {
      toast({
        title: "Message Not Sent",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl sm:mx-0 mx-2">
      <CardHeader>
        <CardTitle>Get in touch </CardTitle>
        <CardDescription>
          Have a question? Submit your inquiry, and I&apos;ll reply promptly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2  gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className=" text-sm">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
                className=" placeholder:text-sm  text-sm"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className=" text-sm">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                className=" placeholder:text-sm  text-sm"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors?.email?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className=" text-sm">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter the message"
              {...register("message")}
              className=" placeholder:text-sm  text-sm"
            />
            {errors.message && (
              <span className="text-red-500 text-xs">
                {errors?.message?.message}
              </span>
            )}
          </div>
          <div className=" text-center">
            <Button
              disabled={loader}
              className="justify-center w-fit disabled:opacity-80 disabled:cursor-not-allowed "
              type="submit"
            >
              {loader ? (
                <>
                  Sending
                  <span className="h-4 w-4 ml-2 rounded-full border-[3px] border-t-transparent animate-spin"></span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
