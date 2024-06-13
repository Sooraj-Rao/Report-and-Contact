/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mwCdFbxOoAu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const Main = () => {
  const [showContactForm, setShowContactForm] = useState(true);
  const [issueType, setIssueType] = useState("");
  const [site, setSite] = useState("");
  const [issueImage, setIssueImage] = useState(null);
  const handleImageUpload = (event) => {
    setIssueImage(event.target.files[0]);
  };
  return (
    <div className="w-full max-w-3xl mx-auto ">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-4">
            <Button
              variant={showContactForm ? "solid" : "outline"}
              className={`px-4 py-2 rounded-md transition-colors ${
                showContactForm
                  ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                  : "border-gray-900 text-gray-900 hover:bg-gray-100 dark:border-gray-50 dark:text-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setShowContactForm(true)}
            >
              Get in Touch
            </Button>
            <Button
              variant={!showContactForm ? "solid" : "outline"}
              className={`px-4 py-2 rounded-md transition-colors ${
                !showContactForm
                  ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                  : "border-gray-900 text-gray-900 hover:bg-gray-100 dark:border-gray-50 dark:text-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setShowContactForm(false)}
            >
              Report an Issue
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="p-6">
          {showContactForm ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter the subject" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Enter your message"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="site">Site</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {site || "Select site"}
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setSite("site1")}>
                          Site 1
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSite("site2")}>
                          Site 2
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSite("site3")}>
                          Site 3
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {issueType || "Select issue type"}
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setIssueType("bug")}>
                          Bug
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setIssueType("feature")}
                        >
                          Feature Request
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setIssueType("other")}
                        >
                          Other
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <Label htmlFor="issue-description">Description</Label>
                  <Textarea
                    id="issue-description"
                    rows={5}
                    placeholder="Describe the issue in detail"
                  />
                </div>
                <div>
                  <Label htmlFor="issue-image">Upload Image</Label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="issue-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {issueImage && (
                      <img
                        src="/placeholder.svg"
                        alt="Issue Image"
                        width={100}
                        height={100}
                        className="object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Report Issue
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
