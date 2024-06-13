/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  site?: string;
  issueType?: string;
  url?: string;
}

export const EmailTemplate = ({
  name,
  email,
  message,
  site,
  issueType,
  url,
}: EmailTemplateProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h3 style={{ color: "#333" }}>
        {site ? "Reported Issue" : "Contact Form Submission"}
      </h3>
      <div style={{ fontSize: "14px" }}>
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Message:</strong>
          {message}
        </div>
        {site && issueType && (
          <div>
            <div>
              <strong>Website:</strong> {site}
            </div>
            <div>
              <strong>Type of issue:</strong> {issueType}
            </div>
            {url && (
              <div>
                <strong>Error Image:</strong> <img src={url} alt="Error" />
                <br />
                <span>
                  Or <br />
                  {url}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
