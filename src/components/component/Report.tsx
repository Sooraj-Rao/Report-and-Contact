"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CiImageOn } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";
import { File, X } from "lucide-react";
import { TooltipWrap } from "../ui/tooltip-provider";
import { SendReport } from "@/actions/sendReport";

const formSchema = z.object({
  site: z.string().nonempty("Please select a site."),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  issueType: z.string().nonempty("Please select an issue type."),
  message: z.string().nonempty("Message is required."),
});

export function Report() {
  const sites = ["Linkhub", "QuickLink", "QuickSend"];
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const storage = getStorage(app);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const UploadFile = async (file, Inputdata) => {
    try {
      const metadata = {
        contentType: file.type,
      };
      const storageRef = ref(storage, "file-upload/" + file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },

        () => {
          setSelectedFile(null);
          return toast({
            variant: "destructive",
            description: "Upload failed",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            handleSendReport(Inputdata, downloadURL);
          });
        }
      );
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Upload failed",
      });
    }
  };

  const handleSendReport = async (Inputdata, downloadURL) => {
    try {
      let Data;
      setLoader(true);
      if (!downloadURL) Data = { Inputdata };
      else Data = { Inputdata, downloadURL };
      const { error, data } = await SendReport({
        Inputdata,
        downloadURL,
      });
      if (!error) {
        reset();
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out!",
        });
      } else
        toast({
          variant: "destructive",
          title: "Message Not Sent",
          description: "An error occurred. Please try again later.",
        });
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Message Not Sent",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setLoader(false);
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data) => {
    setLoader(true);
    if (selectedFile) UploadFile(selectedFile, data);
    else {
      let url = null;
      handleSendReport(data, url);
    }
  };

  return (
    <Card className="w-full max-w-2xl ">
      <CardHeader>
        <CardTitle>Report an Issue</CardTitle>
        <CardDescription>
          Help us improve by reporting any problems you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="site">Website</Label>
              <Select
                id="site"
                {...register("site")}
                onValueChange={(value) => setValue("site", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.site && (
                <span className="text-red-500 text-xs">
                  {errors?.site?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select
                id="issueType"
                {...register("issueType")}
                onValueChange={(value) => setValue("issueType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature-request">
                    Feature Request
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.issueType && (
                <span className="text-red-500 text-xs">
                  {errors?.issueType?.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2   gap-4 ">
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
            <div className="">
              <Label htmlFor="image">Attach Image (optional)</Label>
              <div className="flex items-center    w-full">
                <label
                  className={`flex items-center px-4 text-sm w-full   rounded-md h-10 border ${
                    selectedFile ? "hidden" : "block"
                  }`}
                >
                  <CiImageOn size={24} />
                  <span className="ml-1 mr-3">Choose file</span>
                  <span className=" text-[12px]">(size upto 2 mb)</span>
                  <input
                    onChange={(e) => {
                      const { files } = e.target;
                      if (!files) return;
                      setSelectedFile(files[0]);
                      setValue("image", files[0]);
                    }}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
                <div
                  className={`flex items-center mt-1 gap-x-5 justify-start w-full 
              ${!selectedFile ? "hidden" : "block"}
              `}
                >
                  <Button
                    type="button"
                    className={` pointer-events-none rounded-xl h-7 py-0`}
                  >
                    {selectedFile?.name}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className={`h-5 px-1 py-0 ${
                      selectedFile ? "block" : "hidden"
                    }`}
                    onClick={() => {
                      setSelectedFile(null);
                      setValue("image", null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us about the issue"
              {...register("message")}
            />
            {errors.message && (
              <span className="text-red-500 text-xs">
                {errors?.message?.message}
              </span>
            )}
          </div>
          <div className=" text-center">
            <Button className="justify-center w-fit " type="submit">
              {loader ? (
                <>
                  Reporting Issue
                  <h1 className=" h-4 ml-2 w-4 rounded-full animate-spin border-2 border-t-transparent"></h1>
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
