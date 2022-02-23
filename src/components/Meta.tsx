import Head from "next/head";
import React from "react";

interface MetaProps {
  title?: string;
  description?: string;
  noindex?: boolean;
  keywords?: Array<string> | string;
}

/**
 * Meta data component
 */

const Meta: React.FC<MetaProps> = ({ title, description, noindex, keywords = [] }): JSX.Element => {
  const hostname: string = "https://";
  const allKeywords: Array<string> = process.env.NEXT_PUBLIC_SEO_KEYWORDS.split(",");
  if (typeof keywords === "string") allKeywords.push(keywords);
  else if (Array.isArray(keywords)) allKeywords.push(...keywords);

  const formedTitle: string = `${title}`; //embed title in template

  return (
    <Head>
      {title && <title children={formedTitle} />}
      {title && <meta property="og:title" content={formedTitle} key="ogtitle" />}
      {title && <meta name="twitter:title" content={formedTitle} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} key="ogdesc" />}
      {description && <meta name="twitter:description" content={description} />}
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(",") : keywords} />}
      <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE} />
      <meta property="og:image" content={``} />
      <meta property="og:image:secure_url" content={``} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:url" content={hostname} key="ogurl" />
      <meta name="robots" content={noindex ? "noindex" : "index"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={hostname} />
    </Head>
  );
};

export default Meta;
