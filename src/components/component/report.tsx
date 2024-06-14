"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { SendReport } from "@/actions/sendReport";
import { EmailTemplateProps } from "./email-template";

const formSchema = z.object({
  site: z.string().nonempty("Please select a site."),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  issueType: z.string().nonempty("Please select an issue type."),
  message: z.string().nonempty("Message is required."),
});

const sites = ["Linkhub", "QuickLink", "QuickSend"];
const issues = ["Bug", "Support", "Feature Request", "Other"];

type FormData = {
  name?: string;
  email: string;
  message: string;
  site: string;
  issueType: string;
  image?: File | null;
};

export function Report() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const storage = getStorage(app);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const uploadFile = async (file: File, inputData: FormData) => {
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
        },
        () => {
          setSelectedFile(null);
          toast({
            variant: "destructive",
            description: "Upload failed",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            handleSendReport(inputData, downloadURL);
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

  const handleSendReport = async (inputData: FormData, downloadURL: string) => {
    try {
      setLoader(true);
      const Inputdata: EmailTemplateProps = {
        ...inputData,
        url: downloadURL,
      };

      const { error } = await SendReport(Inputdata);
      if (!error) {
        reset();
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Message Not Sent",
          description: "An error occurred. Please try again later.",
        });
      }
    } catch (error) {
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

  const onSubmit: SubmitHandler<FormData> = (inputData) => {
    setLoader(true);
    if (selectedFile) {
      uploadFile(selectedFile, inputData);
    } else {
      handleSendReport(inputData, "");
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
              <Select onValueChange={(value) => setValue("site", value)}>
                <SelectTrigger id="site" className="w-full">
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
              <Select onValueChange={(value) => setValue("issueType", value)}>
                <SelectTrigger id="issueType" className="w-full">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issues.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.issueType && (
                <span className="text-red-500 text-xs">
                  {errors?.issueType?.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="image" className="  ">Attach Image (optional)</Label>
              <div className="flex items-center w-full">
                <label
                  className={`flex dark:bg-slate-950  items-center px-4 text-sm w-full rounded-md h-10  border ${
                    selectedFile ? "hidden" : "block"
                  }`}
                >
                  <CiImageOn size={24} />
                  <span className="ml-1 mr-3">Choose file</span>
                  <span className="text-[12px]">(up to 2 MB)</span>
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
                  className={`flex items-center mt-1 gap-x-5 justify-start w-full ${
                    !selectedFile ? "hidden" : "block"
                  }`}
                >
                  <Button
                    type="button"
                    className="pointer-events-none rounded-xl h-7 py-0"
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
          <Button className=" w-fit" type="submit" disabled={loader}>
          {loader ? (
                <>
                  Submitting
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
