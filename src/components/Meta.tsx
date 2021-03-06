import Head from "next/head";
import React from "react";
import { isLocal } from "../util/global.config";

interface MetaProps {
  title?: string;
  description?: string;
  noindex?: boolean;
  keywords?: Array<string> | string;
  image?: string;
}

/**
 * Meta data component
 */

const Meta: React.FC<MetaProps> = ({ title, description, noindex, keywords = [], image }): JSX.Element => {
  const hostname: string = isLocal ? "http://localhost:8000" : process.env.NEXT_PUBLIC_HOSTNAME;
  const allKeywords: Array<string> = process.env.NEXT_PUBLIC_SEO_KEYWORDS.split(",") || [];
  if (typeof keywords === "string") allKeywords.push(keywords);
  else if (Array.isArray(keywords)) allKeywords.push(...keywords);

  const prefix: string = process.env.NEXT_PUBLIC_TITLE_PREFIX;

  const formedTitle: string = prefix ? `${prefix} | ${title}` : title; //embed title in template
  const keywordString: string = allKeywords.join(",") || "";

  return (
    <Head>
      {title && <title children={formedTitle} />}
      {title && <meta property="og:title" content={formedTitle} key="ogtitle" />}
      {title && <meta name="twitter:title" content={formedTitle} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} key="ogdesc" />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="keywords" content={keywordString} />
      <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:secure_url" content={image} />}
      <meta name="keywords" content={allKeywords.join(", ")} />
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="627" />}
      <meta property="og:url" content={hostname} key="ogurl" />
      <meta name="robots" content={noindex ? "noindex" : "index"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={hostname} />
    </Head>
  );
};

export default Meta;
