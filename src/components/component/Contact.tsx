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
import axios from "axios";
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

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const [loader, setloader] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (Inputdata) => {
    try {
      setloader(true);
      const { error } = await SendMail(Inputdata);
      if (error)
        return toast({
          title: "Message Not Sent",
          description: "An error occurred. Please try again later.",
        });

      if (!error) {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out!",
        });
        reset();
      }
    } catch (error) {
      return toast({
        title: "Message Not Sent",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setloader(false);
    }
  };

  return (
    <Card className="w-full max-w-md my-10 ">
      <CardHeader>
        <CardTitle>Get in touch</CardTitle>
        <CardDescription>
          Have a question or want to work together? Fill out the form below and
          we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
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
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter the message"
              {...register("message")}
            />
            {errors.message && (
              <span className="text-red-500 text-xs">
                {errors?.message?.message}
              </span>
            )}
          </div>
          <Button
            disabled={loader}
            className="justify-center disabled:opacity-80 disabled:cursor-not-allowed "
            type="submit"
          >
            {loader ? (
              <>
                Sending
                <span className=" h-4 w-4 ml-2 rounded-full border-[3px] border-t-transparent animate-spin"></span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
